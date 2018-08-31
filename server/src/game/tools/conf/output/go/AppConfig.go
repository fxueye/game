package conf

import (
	//"bufio"
	"encoding/json"
	"fmt"
	//"io"
	"io/ioutil"
	"os"
	//"strings"
)

type AppConfigElem struct {
	Id int
	SocketIp string
	SocketPort int
	HttpIp string
	HttpPort int
	
}

type AppConfig0 struct {
	Dic map[int]*AppConfigElem
	Arr []*AppConfigElem
}

var (
	AppConfig AppConfig0
)

func loadAppConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	AppConfig.Dic = make(map[int]*AppConfigElem)
	AppConfig.Arr = make([]*AppConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &AppConfig.Arr)
	for _,conf := range AppConfig.Arr{
		AppConfig.Dic[conf.Id] = conf
	}
	
}
