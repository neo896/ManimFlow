package actions

import (
	"embed"
	"encoding/json"
	"fmt"
	"os"
	"text/template"
)

//go:embed template/scene.tmpl
var sceneTemplate embed.FS

type Node struct {
	ID       string `json:"id"`
	Type     string `json:"type"`
	Position struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
	} `json:"position"`
	Data struct {
		Props map[string]interface{} `json:"props"`
	} `json:"data"`
	Width            float64 `json:"width"`
	Height           float64 `json:"height"`
	Selected         bool    `json:"selected"`
	PositionAbsolute struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
	} `json:"positionAbsolute"`
	Dragging bool `json:"dragging"`
}

type Edge struct {
	ID       string `json:"id"`
	Source   string `json:"source"`
	Target   string `json:"target"`
	Animated bool   `json:"animated"`
}

type Viewport struct {
	X    float64 `json:"x"`
	Y    float64 `json:"y"`
	Zoom float64 `json:"zoom"`
}

type FlowData struct {
	Nodes    []Node   `json:"nodes"`
	Edges    []Edge   `json:"edges"`
	Viewport Viewport `json:"viewport"`
}

func writePython(parse *template.Template, flowData FlowData) {
	err := os.Mkdir("code", os.ModePerm)
	if err != nil {
		fmt.Println("err", err)
	}
	f, err := os.Create("code/scene.py")
	if err != nil {
		fmt.Println("err", err)
	}
	err = parse.Execute(f, flowData)
	if err != nil {
		fmt.Println("Execute err", err)
	}

	defer func(f *os.File) {
		err := f.Close()
		if err != nil {
			fmt.Println("err", err)
		}
	}(f)

}

// SaveSceneAction SaveScene saves the scene to json and generates the python code
func SaveSceneAction(nodes string) {
	var flowData FlowData

	err := json.Unmarshal([]byte(nodes), &flowData)
	if err != nil {
		fmt.Println("Unmarshal err", err)
	}
	file, err := sceneTemplate.ReadFile("template/scene.tmpl")
	if err != nil {
		fmt.Println("err", err)
	}

	parse, err := template.New("scene").Parse(string(file))
	if err != nil {
		fmt.Println("Parse err", err)
	}

	if _, err := os.Stat("code/scene.py"); os.IsNotExist(err) {
		writePython(parse, flowData)
	} else {
		err := os.RemoveAll("code")
		if err != nil {
			fmt.Println("err", err)
		}
		writePython(parse, flowData)
	}

}
