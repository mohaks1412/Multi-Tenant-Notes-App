This is applicaiton has been made for evluation purposes.

1) Schema Choice:
All tenants have a shared schema with a tenantId column that distinguishes them.

2) All the mandatory accounts have been provided

admin@acme.test (Admin, tenant: Acme)
user@acme.test (Member, tenant: Acme)
admin@globex.test (Admin, tenant: Globex)
user@globex.test (Member, tenant: Globex)

3) Role based authorization has been implemented to ensure only Admins can invite other users and upgrade the tenant plan.
   
4) The notes crud Apis have been implemented with following endpoints.

   POST /notes – Create a note
GET /notes – List all notes for the current tenant
GET /notes/:id – Retrieve a specific note
PUT /notes/:id – Update a note
DELETE /notes/:id – Delete a note

please Node - the base URL of these APIs is : https://multi-tenant-backend-seven.vercel.app

5) Auth APIs have been implemented with following endpoints

login - /auth/login
logout /auth/logout

6) Health Api has been implemented

 GET /health
