RD /S /Q tools\rpc\output
tools\rpc\rpc -I tools\rpc\input -O tools\rpc\output -T tools\rpc\temp_rpc

RD /S /Q client\src\cmds
MD client\src\cmds
COPY /Y tools\rpc\output\*.ts client\src\cmds

MD client\src\cmds\wraps
COPY /Y tools\rpc\output\wrap\*.ts client\src\cmds\wraps

RD /S /Q server\src\game\cmds
MD server\src\game\cmds

COPY /Y tools\rpc\output\*.go server\src\game\cmds
MD server\src\game\cmds\wraps
COPY /Y tools\rpc\output\wrap\*.go server\src\game\cmds\wraps

Pause