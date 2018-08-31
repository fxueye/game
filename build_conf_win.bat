RD /S /Q conf\output
tools\conf\conf -I config -O tools\conf\output -T tools\conf\temp_conf

RD /S /Q client\src\config
MD client\src\config
COPY /Y tools\conf\output\ts\* client\src\config

RD /S /Q client\resource\config
MD client\resource\config
COPY /Y tools\conf\output\json\* client\resource\config

RD /S /Q server\src\game\main\gateway\conf
MD server\src\game\main\gateway\conf
COPY /Y tools\conf\output\json\* server\src\game\main\gateway\conf

RD /S /Q server\src\game\conf
MD server\src\game\conf
COPY /Y tools\conf\output\go\* server\src\game\conf

pause