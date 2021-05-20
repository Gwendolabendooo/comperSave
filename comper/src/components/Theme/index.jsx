import React from 'react';
import { Link } from 'react-router-dom';
import Script from '@gumgum/react-script-tag';
import { useCookies } from 'react-cookie';

const Theme = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['Theme']);

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
            const themeAdd={
                id: node.id,
                name: node.data.name
            }

            var Themes = []
            if (cookies.Theme !== undefined) {
                console.log("cookie non vide", cookies.Theme)
                Themes.push(cookies.Theme)
                Themes.push(themeAdd)
            }else{
                Themes.push(themeAdd)
                console.log("cookie vide", Themes)
            }
            JSON.stringify(Themes)

            setCookie('Theme', Themes, { path: '/', expires: new Date(Date.now()+2592000)});
        }

        treeIndented.draw();
        
    };

        return (
            <div className="ctnTheme">
                <div className="profilCompetence" id="profilCompetences"></div>
                <div className="themeInteret"></div>
                <div className="recommendation"></div>
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