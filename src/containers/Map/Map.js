import React, { Component } from "react";
import { darkTheme, ThemeProvider } from "@evergis/ui";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
// TODO fix evergis service modules side effects
import { DataViewService } from "evergis/services/DataViewService";
import { MapService } from "evergis/services/MapService";
import { ServiceContainer } from "evergis/services/ServiceContainer";
import { ServiceGroupService } from "evergis/services/ServiceGroupService";
import { StaticSourceService } from "evergis/services/StaticSourceService";
import { TileService } from "evergis/services/TileService";

import { MapWrapper } from "./styled";
import { Filters } from "../../components/Filters/Filters";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Controls } from "../../components/Atoms/Controls";
import { GridLegend } from "../../components/GridLegend/GridLegend";
import { ScaleControl } from "../../components/ScaleControl/ScaleControl";

const layer2gis = "2gis";
const poi = "layer_a3be7c1ebc384695ac2a80088f82476e";
const grid = "layer_a8c5ffe2949e4011a532ecd53ec903db";

export class Map extends Component {
  state = {
    resolution: 200,
    zoomLvl: 0,
    selectedFilter: "1"
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { resolution } = this.state;

    const sp = new SpatialProcessor({
      url: "http://public.everpoint.ru/sp/",
      services: [layer2gis, poi, grid],
      mapWrapper: this.wrapper,
      resolution
    });

    this.setState({ zoomLvl: this.getLevel(resolution) });

    setInterval(() => {
      // пример вкл/выкл слоя
      sp.layerManager.children[1].layer.isDisplayed = !sp.layerManager.children[1].layer.isDisplayed;
    }, 1000);

    sp.map.maxResolution = 9444;

    this.map = sp.map;

    this.map.on("bboxChangeEnd", this.onBboxChangeEnd);
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
  }

  onBboxChangeEnd = () => {
    const resolution = this.map.resolution;
    this.setState({
      zoomLvl: this.getLevel(resolution),
      resolution
    });
  };

  onRef = ref => {
    this.wrapper = ref;
  };

  onZoom = value => {
    this.map.zoom(value);
  };

  getLevel = resolution => {
    const index = this.map && this.map.tileScheme.getLevel(resolution);

    if (index) {
      return this.map.tileScheme.levels[index].zIndex;
    }
  };

  onFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
  };

  render() {
    const { resolution, zoomLvl, selectedFilter } = this.state;

    return (
      <MapWrapper innerRef={this.onRef}>
        <Filters value={selectedFilter} onFilterChange={this.onFilterChange} />
        <ObjectCard />
        <Controls>
          <ScaleControl zoomLvl={zoomLvl} onZoom={this.onZoom} resolution={resolution} />
          <GridLegend />
        </Controls>
      </MapWrapper>
    );
  }
}
