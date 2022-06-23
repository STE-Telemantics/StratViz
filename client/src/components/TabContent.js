import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import PlotContent from "./PlotContent";

function TabContent(props){

    const [tabName, setTabName] = React.useState(props.tabName);
    const [plots, setPlots] = React.useState(props.plots);

    // Add useEffect to check state of updated signals
    useEffect(() => {props.onChangeTabs(props.tabId, tabName, plots)}, [plots]);

    // TODO: update comments
    // handle change of plot
    const handleChangePlot = (plotName, signals) => {
        
        // Find index of object we want to change
        const plotIndex = plots.findIndex((plot => plot.plotName == plotName));
        
        // copy the original array, as to not mutate the original array
        const newPlots = [...plots];

        // change the value that we want to change
        newPlots[plotIndex] = {plotName, signals};

        // Set the newSignals array as the new array
        setPlots(newPlots);
    }

    return(
        <div label={props.tabName} tabId={props.tabId}>
            <div className='gridContainer'>
                {plots.map(plot => <PlotContent 
                    plotName={plot.plotName} 
                    signals={plot.signals} 
                    onChangePlot={handleChangePlot}
                />)}
            </div>
        </div>
    )


}

TabContent.propTypes = {
    tabName: PropTypes.string.isRequired,
    plots: PropTypes.array.isRequired,
}

export default TabContent