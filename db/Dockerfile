FROM --platform=linux/x86_64 mysql:5.7
ADD init.sql /docker-entrypoint-initdb.d
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD mysqladmin ping -h 127.0.0.1 -u user --password=secret
EXPOSE 3306
