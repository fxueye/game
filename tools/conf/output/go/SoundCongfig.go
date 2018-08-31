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

type SoundCongfigElem struct {
	Id int
	Type int
	Name string
	Des string
	
}

type SoundCongfig0 struct {
	Dic map[int]*SoundCongfigElem
	Arr []*SoundCongfigElem
}

var (
	SoundCongfig SoundCongfig0
)

func loadSoundCongfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	SoundCongfig.Dic = make(map[int]*SoundCongfigElem)
	SoundCongfig.Arr = make([]*SoundCongfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &SoundCongfig.Arr)
	for _,conf := range SoundCongfig.Arr{
		SoundCongfig.Dic[conf.Id] = conf
	}
	
}
