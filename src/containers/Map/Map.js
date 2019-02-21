import React, { Component } from "react";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
// TODO fix evergis service modules side effects
import { DataViewService } from "evergis/services/DataViewService";
import { MapService } from "evergis/services/MapService";
import { ServiceContainer } from "evergis/services/ServiceContainer";
import { ServiceGroupService } from "evergis/services/ServiceGroupService";
import { StaticSourceService } from "evergis/services/StaticSourceService";
import { TileService } from "evergis/services/TileService";

import { MapWrapper } from "./styled";
import { Controls } from "../../components/Atoms/Controls";
import { GridLegend } from "../../components/GridLegend/GridLegend";
import { ScaleControl } from "../../components/ScaleControl/ScaleControl";

const layer2gis = "2gis";
const poi = "layer_a3be7c1ebc384695ac2a80088f82476e";
const grid = "layer_a8c5ffe2949e4011a532ecd53ec903db";

export class Map extends Component {
  state = {
    resolution: 11
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { resolution } = this.state;

    const sp = new SpatialProcessor({
      url: "http://public.everpoint.ru/sp/",
      services: [layer2gis, poi, grid],
      mapWrapper: this.wrapper
    });

    setInterval(() => {
      // пример вкл/выкл слоя
      sp.layerManager.children[1].layer.isDisplayed = !sp.layerManager.children[1].layer.isDisplayed
    }, 1000);

    this.map = sp.map;

    this.map.on("bboxChangeEnd", this.onBboxChangeEnd);
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
  }

  onBboxChangeEnd = () => {
    this.setState({
      resolution: this.map.resolution
    });
  };

  onRef = ref => {
    this.wrapper = ref;
  };

  onZoom = value => {
    this.map.zoom(value);
  };

  render() {
    const { resolution } = this.state;

    return (
      <MapWrapper innerRef={this.onRef}>
        <Controls>
          <ScaleControl onZoom={this.onZoom} resolution={resolution} />
          <GridLegend />
        </Controls>
      </MapWrapper>
    );
  }
}
