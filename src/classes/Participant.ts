import {StatusEnum} from "./StatusEnum"
import {UndoHandler} from "./UndoHandler"
import {Actions} from "./Actions"

export class Participant
{
    private _name: string
    get name(): string {
        return this._name
    }
    set name(val: string) {
        UndoHandler.HandleProperty(this, "name", val)
    }

    private _waiting: boolean
    get waiting(): boolean {
        return this._waiting
    }
    set waiting(val: boolean) {
        UndoHandler.HandleProperty(this, "waiting", val)
    }

    private _finished: boolean
    get finished(): boolean {
        return this._finished
    }
    set finished(val: boolean) {
        UndoHandler.HandleProperty(this, "finished", val)
    }

    private _active: boolean
    get active(): boolean {
        return this._active
    }
    set active(val: boolean) {
        UndoHandler.HandleProperty(this, "active", val)
    }
    
    private _baseIni: number
    get baseIni(): number {
        return this._baseIni
    }
    set baseIni(val: number) {
        UndoHandler.HandleProperty(this, "baseIni", val)
    }

    private _diceIni: number
    get diceIni(): number {
        return this._diceIni
    }
    set diceIni(val: number) {
        UndoHandler.HandleProperty(this, "diceIni", val)
    }

    private _dices: number
    get dices(): number {
        return this._dices
    }
    set dices(val: number) {
        UndoHandler.HandleProperty(this, "dices", val)
    }

    private _wm: number
    get wm(): number {
        return this._wm
    }
    set wm(val: number) {
        UndoHandler.HandleProperty(this, "wm", val)
    }

    private _ooc: boolean
    get ooc(): boolean {
        return this._ooc
    }
    set ooc(val: boolean) {
        UndoHandler.HandleProperty(this, "ooc", val)
    }

    private _edge: boolean
    get edge(): boolean {
        return this._edge
    }
    set edge(val: boolean) {
        UndoHandler.HandleProperty(this, "edge", val)
    }

    private _status: StatusEnum 
    get status(): StatusEnum {
        return this._status
    }
    set status(val: StatusEnum) {
        UndoHandler.HandleProperty(this, "status", val)
    }

    private _actions: Actions
    get actions(): Actions {
        return this._actions
    }
    set actions(val: Actions) {
        UndoHandler.HandleProperty(this, "actions", val)
    }

    constructor()
    {
        this.status = StatusEnum.Waiting
        this.waiting = false
        this.finished = false
        this.active = false
        this.baseIni = 0
        this.diceIni = 0
        this.dices = 1
        this.wm = 0
        this.ooc = false
        this.actions = new Actions()
        this.edge = false
        this.name = ""
    }

    seizeInitiative() 
    {
        this.edge = true
    }

    calculateInitiative(initiativeTurn: number)
    {
        var ini = this.diceIni + this.baseIni - this.wm -(initiativeTurn-1) * 10 + this.actions.modifier
        return ini
    }

    leaveCombat()
    {
        this.ooc = true
    }

    enterCombat()
    {
        this.ooc = false
    }

    rollInitiative() {
        this.diceIni = 0
        var max = 6
        var min = 1
        for(var i = 0; i < this.dices; i++) {
            this.diceIni += Math.floor(Math.random() * (max - min + 1)) + min
        }  

        var test = false
        // DICE TEST
        if (test) {
            var slots: Array<number> = new Array<number>()
            for (var index = 1; index <= 6; index++) {
                slots[index] = 0            
            }
            for(var i = 0; i < 1000000; i++) {
                var d = Math.floor(Math.random() * (max - min + 1)) + min
                slots[d]++
            }
            console.log(slots)
        }

    }

    softReset(revive = false)
    {
        this.diceIni = 0
        this.edge = false
        this.status = StatusEnum.Waiting
        if (revive || !this.ooc)
        {
            this.enterCombat()
        }
        this.actions.reset()
    }

    hardReset()
    {
        this.softReset(true)
        this.wm = 0
        this.diceIni = 0
        this.dices = 1
        this.baseIni = 0
    }
}