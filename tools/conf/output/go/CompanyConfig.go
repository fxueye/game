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

type CompanyConfigElem struct {
	Id int
	BodyId int
	Job string
	Name string
	FirstNature int
	FirstDes string
	FirstAdd float32
	SecondNature int
	SecondDes string
	SecondAdd float32
	EnergyLevel string
	EnergyValue string
	EnergyConsume float32
	
}

type CompanyConfig0 struct {
	Dic map[int]*CompanyConfigElem
	Arr []*CompanyConfigElem
}

var (
	CompanyConfig CompanyConfig0
)

func loadCompanyConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	CompanyConfig.Dic = make(map[int]*CompanyConfigElem)
	CompanyConfig.Arr = make([]*CompanyConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &CompanyConfig.Arr)
	for _,conf := range CompanyConfig.Arr{
		CompanyConfig.Dic[conf.Id] = conf
	}
	
}
