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

type ParticleConfigElem struct {
	Id int
	Texture string
	Config string
	Location []int
	Scale []float32
	
}

type ParticleConfig0 struct {
	Dic map[int]*ParticleConfigElem
	Arr []*ParticleConfigElem
}

var (
	ParticleConfig ParticleConfig0
)

func loadParticleConfig(path string) {
	file, err := os.Open(path)
	defer func() {
		if file != nil {
			file.Close()
		}
	}()
	if err != nil {
		panic(fmt.Sprint("load config error, path=", path))
	}

	ParticleConfig.Dic = make(map[int]*ParticleConfigElem)
	ParticleConfig.Arr = make([]*ParticleConfigElem, 0, 32)

	bt,err  :=  ioutil.ReadAll(file)
	json.Unmarshal(bt, &ParticleConfig.Arr)
	for _,conf := range ParticleConfig.Arr{
		ParticleConfig.Dic[conf.Id] = conf
	}
	
}
