# NC News Setup

Project Summary:

An API to access application data programmatically. The intention is to replicate the building of a real world backend service (such as Reddit) which will provide information to the Front End Architecture.

Dependencies are listed in the package.json
run npm install to install dependencies

the project uses - Node version - v25.1.0
and Postgres version - v 2.9.2

Two Environment files need creating to link to the correct databases:

.env.development, which links to this database: PGDATABASE=nc_news
.env.test, which links to this database: PGDATABASE=nc_news_test
