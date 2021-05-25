import React, { useState, setState } from 'react';
import { Link } from 'react-router-dom';
import Script from '@gumgum/react-script-tag';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faBookOpen, faCompass, faHammer, faRocket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var jwt = require('jsonwebtoken');
var fs = require('fs')

const Theme = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['Theme']);

// API PROFIL DE COMPETENCE

    // let url = "https://comper.projet.liris.cnrs.fr/sites/profile-engine/api/profile/recommendation/index.php?frameworkId=83&learnerUsername=asker:ext_Celian.Abadie"

    // axios.get(url, {
    //     headers: { "Access-Control-Allow-Origin": '*' , "x-comper-accepted-host": "https://traffic.irit.fr"}
    // }).then(res => { 
    //     console.log(res);

    // }).catch(error => {
    //     console.log('erro', error);
    // })



// API RECOMMANDATION

    // var url = "https://traffic.irit.fr/comper/recommendations/api/retrieve/last/json/"

    // var privateKey = fs.readFileSync('gwendal.key');

    // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

    // axios.get(url, {
    //     headers: { "Authorization": "Bearer "+jwt_encoded, "Accept": "application/json"}
    // }).then(res => { 
    //     console.log(res);

    // }).catch(error => {
    //     console.log('erro', error);
    // })

    



    const [methode, setMethode] = useState(null);
    const [themeList, setThemeList] = useState(cookies.Theme);

    var tabThemes = []



    function scriptCharge() {
        var OLM             = null;
        var fw_tree         = null;
        var config  = {
          "useHash": true, 
          "hashTreshold": 0.1,
          "useLegend": true,
          "colors": [{
            "to": 0.4,
            "color": "#cf000f"
          }, {
            "to": 0.8,
            "color": "#f7ca18"
          }, {
            "color": "#00b16a"
          }],
          "noValueColor": "#808080"
        };
    
        OLM = document._OLM;
        let framework = OLM.CORE.Utils.getScoredFrameworkSample();

        fw_tree = new OLM.CORE.FrameworkTree();
        fw_tree.buildFromFramework(framework);

        let treeIndented  = new OLM.TreeIndented(document.getElementById('profilCompetences'), fw_tree, config);

        treeIndented.onClick = (node) => {
            //Incrémentation du cookie
            const themeAdd={
                id: node.id,
                name: node.data.name
            }

            var doublon = 0;
            console.log("valeur de base: ",cookies.Theme)

            if (cookies.Theme != undefined) {
                console.log("cookie")

                tabThemes = cookies.Theme

                tabThemes.forEach(function(item){
                    console.log(item.id, "==" ,themeAdd.id)
                    if (item.id == themeAdd.id) {
                        doublon++;
                        console.log("doublon",doublon)
                    }
                });
                if (doublon == 0) {
                    tabThemes.push(themeAdd)
                }
            }else{
                tabThemes.push(themeAdd)
                console.log("cookie vide")
            }

            majTheme(tabThemes)
            JSON.stringify(tabThemes)

            setCookie('Theme', tabThemes, { path: '/', expires: new Date(Date.now()+2592000)});
        }

        treeIndented.draw();
        
    };

    const majTheme = (params) => {
        setThemeList(params)
    }

    function selectedMethod(e){
        var test = 0
        if (e.target.parentNode.tagName == "svg") {
            e.target.parentNode.parentNode.parentNode.children[0].classList.remove('methodselected2')
            e.target.parentNode.parentNode.parentNode.children[1].classList.remove('methodselected2')
            e.target.parentNode.parentNode.parentNode.children[2].classList.remove('methodselected2')
            e.target.parentNode.parentNode.parentNode.children[3].classList.remove('methodselected2')

            test = e.target.parentNode.parentNode.classList

            e.target.parentNode.parentNode.classList.add('methodselected2')
        }else{
            e.target.parentNode.parentNode.children[0].classList.remove('methodselected2')
            e.target.parentNode.parentNode.children[1].classList.remove('methodselected2')
            e.target.parentNode.parentNode.children[2].classList.remove('methodselected2')
            e.target.parentNode.parentNode.children[3].classList.remove('methodselected2')

            test = e.target.parentNode.parentNode.classList[0]

            e.target.parentNode.classList.add('methodselected2')
        }
    }

    var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    var heure   = n.getHours();
    var minute  = n.getMinutes();

    if (m.toString().length == 1) {
        m = "0"+m
    }
    if (d.toString().length == 1) {
        d = "0"+d
    }
    if (heure.toString().length == 1) {
        heure = "0"+heure
    }
    if (minute.toString().length == 1) {
        minute = "0"+minute
    }

    const datelocal = "" +y + "-" + m + "-" + d +"T"+heure+":"+minute+"";

    const deleteTheme = e => {
        if (e.target.parentNode.tagName == "svg") {
            e.target.parentNode.parentNode.style.display = "none"
        }else{
            e.target.parentNode.style.display = "none"
        }
    }

    const listItems = themeList.map((item) =>
        <li className="themeItem" id={item.id} key={item.id}><FontAwesomeIcon onClick={deleteTheme} className="delete" icon={['fas', 'trash']} /> <div className="name-item">{item.name}</div> <div className="methodeItem"> <FontAwesomeIcon icon={['fas', 'book']} /><div className="ctn-list-methode"><div onClick={selectedMethod} className="decouverte"><FontAwesomeIcon className="" icon={['fas', 'compass']} /></div><div className="renforcement" onClick={selectedMethod}><FontAwesomeIcon className="" icon={['fas', 'hammer']} /></div><div className="soutien" onClick={selectedMethod}><FontAwesomeIcon className="" icon={['fas', 'rocket']} /></div><div className="revision" onClick={selectedMethod}><FontAwesomeIcon className="" icon={['fas', 'book-open']} /></div></div></div> <input className="date-etudie" type="datetime-local" min={datelocal} value={datelocal} /></li>
    );

    function themeChoisis(e){
        if (e.target.classList.contains('type-travaille')) {
            e.target.parentNode.children[0].classList.remove('methodeSelect')
            e.target.parentNode.children[1].classList.remove('methodeSelect')
            e.target.parentNode.children[2].classList.remove('methodeSelect')
            e.target.parentNode.children[3].classList.remove('methodeSelect')
            e.target.classList.add("methodeSelect")
            setMethode(e.target.textContent)
        }else if(e.target.tagName == "path"){
            e.target.parentNode.parentNode.parentNode.children[0].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.parentNode.children[1].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.parentNode.children[2].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.parentNode.children[3].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.classList.add("methodeSelect")
            setMethode(e.target.parentNode.parentNode.textContent)
        }else if((e.target.tagName == "H3") || (e.target.tagName == "svg")){
            e.target.parentNode.parentNode.children[0].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.children[1].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.children[2].classList.remove('methodeSelect')
            e.target.parentNode.parentNode.children[3].classList.remove('methodeSelect')
            e.target.parentNode.classList.add("methodeSelect")
            setMethode(e.target.parentNode.textContent)
        }
    }

    library.add(
        faCompass,
        faHammer,
        faRocket,
        faBookOpen,
        faTrash,
        faBook
    );

        return (
            <div className="ctnTheme">
                <div className="methode">
                    <div className="type-travaille" onClick={themeChoisis}>
                        <FontAwesomeIcon className="" icon={['fas', 'compass']} />
                        <h3>Découverte</h3>
                    </div>
                    <div className="type-travaille" onClick={themeChoisis}>
                        <FontAwesomeIcon className="" icon={['fas', 'hammer']} />
                        <h3>Renforcement</h3>
                    </div>
                    <div className="type-travaille" onClick={themeChoisis}>
                        <FontAwesomeIcon className="" icon={['fas', 'rocket']} />
                        <h3>Soutien</h3>
                    </div>
                    <div className="type-travaille" onClick={themeChoisis}>
                        <FontAwesomeIcon className="" icon={['fas', 'book-open']} />
                        <h3>Révision</h3>
                    </div>
                </div>
                <div className="profilCompetence" id="profilCompetences"></div>
                <div className="themeInteret">
                    <h2>Thèmes d'intérêt</h2>
                    <ul>
                        {listItems}
                    </ul>
                </div>
                <div className="recommendation">
                    <h2>Recommandations</h2>
                </div>
                <Script
                    src="http://yourjavascript.com/2210520913/olm-bundle.js"
                    type="text/javascript"
                    onLoad={ scriptCharge }
                    async
                    defer
                />
            </div>
        )

}

export default Theme;