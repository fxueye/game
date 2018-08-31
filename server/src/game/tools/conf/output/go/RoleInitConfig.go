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

type RoleInitConfigElem struct {
	Id int
	IconID int
	Gold int
	Diamond int
	InitSuit int
	
}

type RoleInitConfig0 struct {
	Dic map[int]*RoleInitConfigElem
	Arr []*RoleInitConfigElem
}

var (
	RoleInitConfig RoleInitConfig0
)

func loadRoleInitConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	RoleInitConfig.Dic = make(map[int]*RoleInitConfigElem)
	RoleInitConfig.Arr = make([]*RoleInitConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &RoleInitConfig.Arr)
	for _,conf := range RoleInitConfig.Arr{
		RoleInitConfig.Dic[conf.Id] = conf
	}
	
}
