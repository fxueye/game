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

type BuildingConfigElem struct {
	Id int
	Name string
	TextId int
	NameLocation []int
	Open int
	Image string
	Location []int
	GateId int
	
}

type BuildingConfig0 struct {
	Dic map[int]*BuildingConfigElem
	Arr []*BuildingConfigElem
}

var (
	BuildingConfig BuildingConfig0
)

func loadBuildingConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	BuildingConfig.Dic = make(map[int]*BuildingConfigElem)
	BuildingConfig.Arr = make([]*BuildingConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &BuildingConfig.Arr)
	for _,conf := range BuildingConfig.Arr{
		BuildingConfig.Dic[conf.Id] = conf
	}
	
}
