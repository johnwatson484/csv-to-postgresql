# Development
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS development

RUN apk update \
  && apk --no-cache add curl procps unzip \
  && wget -qO- https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l /vsdbg

RUN addgroup -g 1000 dotnet \
    && adduser -u 1000 -G dotnet -s /bin/sh -D dotnet

USER dotnet
WORKDIR /home/dotnet

COPY --chown=dotnet:dotnet ./Directory.Build.props ./Directory.Build.props
RUN true
COPY --chown=dotnet:dotnet ./CsvToPostgreSql/*.csproj ./CsvToPostgreSql/
RUN dotnet restore ./CsvToPostgreSql/CsvToPostgreSql.csproj

COPY --chown=dotnet:dotnet ./CsvToPostgreSql/ ./CsvToPostgreSql/
RUN dotnet publish ./CsvToPostgreSql/ -c Release -o /home/dotnet/out

ENV ASPNETCORE_ENVIRONMENT=development
# Override entrypoint using shell form so that environment variables are picked up
ENTRYPOINT dotnet watch --project ./CsvToPostgreSql run

# Production
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS production

RUN addgroup -g 1000 dotnet \
    && adduser -u 1000 -G dotnet -s /bin/sh -D dotnet

USER dotnet
WORKDIR /home/dotnet

COPY --from=development /home/dotnet/out/ ./
ENV ASPNETCORE_ENVIRONMENT=production
# Override entrypoint using shell form so that environment variables are picked up
ENTRYPOINT dotnet CsvToPostgreSql.dll
