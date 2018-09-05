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

type IntervalConfigElem struct {
	Id int
	IntervalId int
	OddsId int
	McId int
	
}

type IntervalConfig0 struct {
	Dic map[int]*IntervalConfigElem
	Arr []*IntervalConfigElem
}

var (
	IntervalConfig IntervalConfig0
)

func loadIntervalConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	IntervalConfig.Dic = make(map[int]*IntervalConfigElem)
	IntervalConfig.Arr = make([]*IntervalConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &IntervalConfig.Arr)
	for _,conf := range IntervalConfig.Arr{
		IntervalConfig.Dic[conf.Id] = conf
	}
	
}
