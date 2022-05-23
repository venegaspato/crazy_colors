class LocalStorage{
    static read(){
        let configuracion = null

        if(localStorage.getItem("Configuracion") !== null)
            configuracion = JSON.parse(localStorage.getItem("Configuracion"));

        return configuracion;
    }

    static save(configuracion){
        let jsonString = null;

        if(configuracion.Musica !== undefined && configuracion.Coop !== undefined)
        jsonString = `{"Musica" : "${configuracion.Musica}", "Coop" : "${configuracion.Coop}"}`;
        else if(configuracion.Musica !== undefined && configuracion.Coop === undefined)
        jsonString = `{"Musica" : "${configuracion.Musica}", "Coop" : "false"}`;
        else if(configuracion.Musica === undefined && configuracion.Coop !== undefined)
        jsonString = `{"Musica" : "false", "Coop" : "${configuracion.Coop}"}`;
        

        localStorage.setItem("Configuracion", jsonString);
    }
}

export default LocalStorage;