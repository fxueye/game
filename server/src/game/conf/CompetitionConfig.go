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

type CompetitionConfigElem struct {
	Id int
	Type int
	ApartTime float32
	OffsetTime float32
	StopTime float32
	FreshenTime float32
	WaitingTime float32
	Space int
	ProSpace int
	DataSize int
	DataPosition []int
	DataColor string
	DataDotColor string
	UprealRate float32
	UprealValue float32
	UpdashedRate float32
	UpdashedValue float32
	DownrealRate float32
	DownrealValue float32
	DowndashedRate float32
	DowndashedValue float32
	BetIds []int
	IntervalIds []int
	McId int
	Location []int
	Scale float32
	ParticleId int
	
}

type CompetitionConfig0 struct {
	Dic map[int]*CompetitionConfigElem
	Arr []*CompetitionConfigElem
}

var (
	CompetitionConfig CompetitionConfig0
)

func loadCompetitionConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	CompetitionConfig.Dic = make(map[int]*CompetitionConfigElem)
	CompetitionConfig.Arr = make([]*CompetitionConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &CompetitionConfig.Arr)
	for _,conf := range CompetitionConfig.Arr{
		CompetitionConfig.Dic[conf.Id] = conf
	}
	
}
