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

type DayConfigElem struct {
	Id int
	MarketType int
	Day string
	IsOpen int
	Des string
	
}

type DayConfig0 struct {
	Dic map[int]*DayConfigElem
	Arr []*DayConfigElem
}

var (
	DayConfig DayConfig0
)

func loadDayConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	DayConfig.Dic = make(map[int]*DayConfigElem)
	DayConfig.Arr = make([]*DayConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &DayConfig.Arr)
	for _,conf := range DayConfig.Arr{
		DayConfig.Dic[conf.Id] = conf
	}
	
}
