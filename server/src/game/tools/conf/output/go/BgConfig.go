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

type BgConfigElem struct {
	Id int
	Type int
	Imgs []int
	Floor int
	Particle []int
	BgMusic int
	Des string
	
}

type BgConfig0 struct {
	Dic map[int]*BgConfigElem
	Arr []*BgConfigElem
}

var (
	BgConfig BgConfig0
)

func loadBgConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	BgConfig.Dic = make(map[int]*BgConfigElem)
	BgConfig.Arr = make([]*BgConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &BgConfig.Arr)
	for _,conf := range BgConfig.Arr{
		BgConfig.Dic[conf.Id] = conf
	}
	
}
