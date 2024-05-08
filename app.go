package main

import (
	"context"
	"embed"
	"fmt"
	"os"
	"text/template"
)

//go:embed template/scene.tmpl
var sceneTemplate embed.FS

type Pet struct {
	Name   string
	Sex    string
	Intact bool
	Age    string
	Breed  string
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SaveScene(nodes string) {
	//fmt.Println(nodes)
	dogs := []Pet{
		{
			Name:   "Jujube",
			Sex:    "Female",
			Intact: false,
			Age:    "10 months",
			Breed:  "German Shepherd/Pitbull",
		},
		{
			Name:   "Zephyr",
			Sex:    "Male",
			Intact: true,
			Age:    "13 years, 3 months",
			Breed:  "German Shepherd/Border Collie",
		},
	}
	file, err := sceneTemplate.ReadFile("template/scene.tmpl")
	if err != nil {
		fmt.Println("err", err)
	}
	fmt.Println(string(file))
	parse, err := template.New("xxx").Parse(string(file))
	if err != nil {
		fmt.Println("err", err)
	}
	err = parse.Execute(os.Stdout, dogs)
	if err != nil {
		fmt.Println("err", err)
	}
}
