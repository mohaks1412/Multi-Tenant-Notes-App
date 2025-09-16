import { useEffect, useState } from "react";
import axios from "axios";
import { Edit2 } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import appwriteService from "../services/AppwriteService";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
    socialLinks: { linkedin: "", github: "", twitter: "" },
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          bio: res.data.bio || "",
          phone: res.data.phone || "",
          socialLinks: res.data.socialLinks || { linkedin: "", github: "", twitter: "" },
        });

        const avatarUrl = res.data.avatar
          ? await appwriteService.getFileViewURL(res.data.avatar)
          : "/default-avatar.png";
        setAvatarPreview(avatarUrl);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("bio", formData.bio);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("socialLinks", JSON.stringify(formData.socialLinks));

      if (avatarFile) {
        const appwriteId = await appwriteService.uploadFile(avatarFile);
        dataToSend.append("avatar", appwriteId);
      }

      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/users/me`, dataToSend, {
        withCredentials: true,
      });

      setUser(res.data.user);
      setEditMode(false);
      setAvatarFile(null);

      if (res.data.user.avatar) {
        setAvatarPreview(appwriteService.getFileViewURL(res.data.user.avatar));
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (!user) return <div className={styles.loadingMessage}>Loading...</div>;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarPreview}
            alt="Avatar"
            className={`${styles.profileAvatar} ${editMode ? styles.clickable : ""}`}
            onClick={() => editMode && document.getElementById("avatarInput").click()}
          />
          {editMode && (
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          )}
        </div>
        <div>
          <p className={styles.profileName}>{user.name}</p>
          <p className={styles.profileRole}>{user.role}</p>
        </div>
        {!editMode && (
          <Edit2 size={20} className={styles.editIcon} onClick={() => setEditMode(true)} />
        )}
      </div>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} readOnly={!editMode} />
        <Input label="Bio" name="bio" value={formData.bio} onChange={handleChange} multiline readOnly={!editMode} />
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} readOnly={!editMode} />
        <Input label="LinkedIn" name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} readOnly={!editMode} />
        <Input label="GitHub" name="socialLinks.github" value={formData.socialLinks.github} onChange={handleChange} readOnly={!editMode} />
        <Input label="Twitter" name="socialLinks.twitter" value={formData.socialLinks.twitter} onChange={handleChange} readOnly={!editMode} />

        {editMode && (
          <div className={styles.profileButtons}>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={() => setEditMode(false)} variant="secondary">Cancel</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
