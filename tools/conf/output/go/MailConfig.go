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

type MailConfigElem struct {
	Id int
	MailId int
	MailContent string
	MailType int
	SubjectText int
	SubjectDes string
	ContentText int
	ContentDes string
	SenderText int
	SenderDes string
	Icon int
	RewardItemIds []int
	RewardNum []int
	SaveTime int
	
}

type MailConfig0 struct {
	Dic map[int]*MailConfigElem
	Arr []*MailConfigElem
}

var (
	MailConfig MailConfig0
)

func loadMailConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	MailConfig.Dic = make(map[int]*MailConfigElem)
	MailConfig.Arr = make([]*MailConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &MailConfig.Arr)
	for _,conf := range MailConfig.Arr{
		MailConfig.Dic[conf.Id] = conf
	}
	
}
