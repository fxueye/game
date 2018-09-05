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

type OddsConfigElem struct {
	Id int
	Des string
	ConfirmValue float32
	MovingRate float32
	
}

type OddsConfig0 struct {
	Dic map[int]*OddsConfigElem
	Arr []*OddsConfigElem
}

var (
	OddsConfig OddsConfig0
)

func loadOddsConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	OddsConfig.Dic = make(map[int]*OddsConfigElem)
	OddsConfig.Arr = make([]*OddsConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &OddsConfig.Arr)
	for _,conf := range OddsConfig.Arr{
		OddsConfig.Dic[conf.Id] = conf
	}
	
}
