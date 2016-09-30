class Participant
{
    constructor(row)
    {
        this.row = row;
        this.setStatus(StatusEnum.Idle);
        this.waiting = false;
        this.finished = false;
        this.active = false;
        this.baseIni = 0;
        this.ini = 0;
        this.vm = 0;
        this.iniChange = 0;
        this.dead = false;
    }

    calculateInitiative()
    {
        this.ini = this.baseIni + this.iniChange - this.vm -(initiativeTurn-1) * 10;
        $(this.row).find('.effIni')[0].innerHTML = this.ini;
        return this.ini;
    }

    syncValuesFromRow()
    {
        this.baseIni = convertToInt($(this.row).find('.inpIni')[0].value);
        if (this.baseIni != 0)
        {
            $(this.row).removeClass('awaitingINI')
        }
        else
        {
            $(this.row).addClass('awaitingINI')
        }
        this.vm = convertToInt($(this.row).find('.vm')[0].value);
        this.iniChange = convertToInt($(this.row).find('.iniChange')[0].value);
        this.calculateInitiative();
    }

    syncValuesToRow()
    {
        $(this.row).find('.inpIni')[0].value = this.baseIni;
        if (this.baseIni != 0)
        {
            $(this.row).removeClass('awaitingINI')
        }
        else
        {
            $(this.row).addClass('awaitingINI')
        }
        $(this.row).find('.vm')[0].value = this.vm;
        $(this.row).find('.iniChange')[0].value = this.iniChange;
        this.calculateInitiative();
    }

    die()
    {
        $(this.row).addClass('dead');
        this.dead = true;
    }

    revive()
    {
        $(this.row).removeClass('dead');
        this.dead = false;
    }

    setStatus(status)
    {
        $(this.row).removeClass('finished');
        $(this.row).removeClass('acting');
        $(this.row).removeClass('waiting');
        this.status = status;
        if (status == StatusEnum.Waiting)
        {
            $(this.row).addClass('waiting');
        }
        if (status == StatusEnum.Finished)
        {
            $(this.row).addClass('finished');
        }
        if (status == StatusEnum.Active)
        {
            $(this.row).addClass('acting');
        }
    }

    softReset()
    {
        this.baseIni = 0;
        if (!this.dead)
        {
            this.setStatus(StatusEnum.Idle);
        }
        this.syncValuesToRow();
    }

    hardReset()
    {
        this.setStatus(StatusEnum.Idle);
        this.vm = 0;
        this.iniChange = 0;
        this.syncValuesToRow();
    }
}

StatusEnum = {
    Active : 0,
    Waiting : 1,
    Finished : 2,
    Dead : 3,
    Idle: 4
}