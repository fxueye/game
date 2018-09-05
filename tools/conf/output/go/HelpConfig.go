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

type HelpConfigElem struct {
	Id int
	HelpText string
	
}

type HelpConfig0 struct {
	Dic map[int]*HelpConfigElem
	Arr []*HelpConfigElem
}

var (
	HelpConfig HelpConfig0
)

func loadHelpConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	HelpConfig.Dic = make(map[int]*HelpConfigElem)
	HelpConfig.Arr = make([]*HelpConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &HelpConfig.Arr)
	for _,conf := range HelpConfig.Arr{
		HelpConfig.Dic[conf.Id] = conf
	}
	
}
