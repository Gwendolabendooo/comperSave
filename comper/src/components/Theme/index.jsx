import React, { useState, setState } from 'react';
import { Link } from 'react-router-dom';
import Script from '@gumgum/react-script-tag';
import { useCookies } from 'react-cookie';
import { useJwt } from "react-jwt";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen, faCompass, faHammer, faRocket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Theme = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['Theme']);

    // axios({ "method": 'get', "url": 'https://comper.projet.liris.cnrs.fr/sites/profile-engine/api/profile/recommendation/index.php?frameworkId=83&learnerUsername=asker:ext_Celian.Abadie', "headers": { 'x-comper-accepted-host': `https://traffic.irit.fr`,  "Access-Control-Allow-Origin": '*'} }).then((response) => {
    //     console.log(response);
    // }).catch (
    //     function (error) {
    //         console.log(error)
    //     })  

    const [methode, setMethode] = useState(null);
    const [themeList, setThemeList] = React.useState(cookies.Theme);
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
                name: node.data.name,
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

    const listItems = themeList.map((item) =>
        <li className="themeItem" id={item.id} key={item.id}><FontAwesomeIcon className="delete" icon={['fas', 'trash']} />{item.name}</li>
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
        faTrash
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