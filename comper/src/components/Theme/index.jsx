import React from 'react';
import { Link } from 'react-router-dom';
import Script from '@gumgum/react-script-tag';

class Theme extends React.Component {

    scriptCharge = () => {
        var OLM = document._OLM;
        var svgId = null
        var config={
            "fontHoverColor": "rgba(255, 255, 255, 1)",
            "fontColor": "rgba(255, 255, 255, .85)",
            "colors": [
                {
                    "to": 0.4,
                    "color": "#cf000f"
                },
                {
                    "to": 0.8,
                    "color": "#f7ca18"
                },
                {
                    "color": "#00b16a"
                }
            ],
            "noValueColor": "#808080",
            "showMastery": true,
            "showTrust": true,
            "showCover": true,
            "formatMastery": "percentage",
            "formatTrust": "percentage",
            "formatCover": "percentage"
        }
        // Creates a sample framework randomly scored. This should be replaced with some framework retrieving function. 
        let framework = OLM.CORE.Utils.getScoredFrameworkSample();
        // Creates a tree based on the framework.
        let fw_tree = new OLM.CORE.FrameworkTree();
        fw_tree.buildFromFramework(framework);
        console.log(fw_tree, "olm")
        // Creates the treeIndented object. The config is editable on the right =>  
        let treeIndented  = new OLM.treeIndented(document.getElementById('profilCompetence'), fw_tree, config);
        treeIndented.onClick = (node) => {
          // Your click behavior here. In the exemple below, we just pompt the node in the console.
        }
        // We chose an id for the svg element. Default behavior automatically creates a unique id.
        treeIndented.draw(svgId = 'test-pack');
        
    };

    render() {
        return (
            <div className="ctnTheme">
                <div className="profilCompetence" id="profilCompetence"></div>
                <div className="themeInteret"></div>
                <div className="recommendation"></div>
                <Script
                    src="http://yourjavascript.com/2210520913/olm-bundle.js"
                    type="text/javascript"
                    onLoad={ this.scriptCharge }
                    async
                    defer
                />
            </div>
        )
    }

}

export default Theme;