package main

import (
	"ManimFlow/actions"
	"context"
)

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

// SaveScene saves the scene to json and generates the python code
func (a *App) SaveScene(nodes string) {
	actions.SaveSceneAction(nodes)
}
