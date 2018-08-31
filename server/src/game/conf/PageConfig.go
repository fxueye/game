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

type PageConfigElem struct {
	Id int
	PageId int
	Bg int
	Type int
	Location []int
	Body int
	Scale float32
	Des string
	
}

type PageConfig0 struct {
	Dic map[int]*PageConfigElem
	Arr []*PageConfigElem
}

var (
	PageConfig PageConfig0
)

func loadPageConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	PageConfig.Dic = make(map[int]*PageConfigElem)
	PageConfig.Arr = make([]*PageConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &PageConfig.Arr)
	for _,conf := range PageConfig.Arr{
		PageConfig.Dic[conf.Id] = conf
	}
	
}
