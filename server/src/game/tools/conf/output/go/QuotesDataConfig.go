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

type QuotesDataConfigElem struct {
	Id int
	TextId int
	Name string
	KeyId int
	
}

type QuotesDataConfig0 struct {
	Dic map[int]*QuotesDataConfigElem
	Arr []*QuotesDataConfigElem
}

var (
	QuotesDataConfig QuotesDataConfig0
)

func loadQuotesDataConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	QuotesDataConfig.Dic = make(map[int]*QuotesDataConfigElem)
	QuotesDataConfig.Arr = make([]*QuotesDataConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &QuotesDataConfig.Arr)
	for _,conf := range QuotesDataConfig.Arr{
		QuotesDataConfig.Dic[conf.Id] = conf
	}
	
}
