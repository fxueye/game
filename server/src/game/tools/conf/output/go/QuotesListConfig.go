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

type QuotesListConfigElem struct {
	Id int
	GateType int
	GateId int
	Name string
	DataSeries []int
	Special string
	Textid string
	Des string
	Isbuy string
	
}

type QuotesListConfig0 struct {
	Dic map[int]*QuotesListConfigElem
	Arr []*QuotesListConfigElem
}

var (
	QuotesListConfig QuotesListConfig0
)

func loadQuotesListConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	QuotesListConfig.Dic = make(map[int]*QuotesListConfigElem)
	QuotesListConfig.Arr = make([]*QuotesListConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &QuotesListConfig.Arr)
	for _,conf := range QuotesListConfig.Arr{
		QuotesListConfig.Dic[conf.Id] = conf
	}
	
}
