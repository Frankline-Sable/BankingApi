commands:

dotnet --version

### Create a new web APi project named "BankingApi"
dontnet new webapi -n BankingAPi

### Trust local HTTPS dev certificate 
dotnet dev-certs https --trust

## run
dotnet run

### Package manager
dotnet add package packahe


### Manifest package.json
BankingAPi.csproj


### App entry app.js/server.js
program.cs


## ROuting Endpoints
[HttpPost(transfer)]

## Logs
Console.WriteLine()





# Angular
### install angular cli globally
npm install -g @angular/cli

### Create new angular workspace
ng new BankingUi --routing=false --ssr=false


### install uuid needed for security and idempotency
npm install uuid
npm install --save-dev @types/uuid

### start frontend server
ng serve --open



##IDEMPOTENCY
Repeating the same operation should produce the same final outcome without performing the operation multiple times.


### Persisting Data to local db
Etity framerwork Core


### install the EF Core Database provider
dotnet add package Microsoft.EntityFrameworkCore.Sqlite

### install the design tools need to create db migrations
dotnet add package Microsoft.EntityFrameworkCore.Design


### create and apply the db migration
dotnet tool install --global dotnet-ef


# 1. Create the blueprint code for your tables
dotnet ef migrations add InitialCreate

# 2. Execute that code to generate the actual banking.db file
dotnet ef database update
