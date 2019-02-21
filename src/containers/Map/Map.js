import React, { Component } from "react";
import { init, TileLayer, Point } from "@evergis/sgis";

import { MapWrapper } from "./styled";
import { Filters } from "../../components/Filters/Filters";
import { Controls } from "../../components/Atoms/Controls";
import { GridLegend } from "../../components/GridLegend/GridLegend";
import { ScaleControl } from "../../components/ScaleControl/ScaleControl";

export class Map extends Component {
  state = {
    resolution: 11,
    zoomLvl: 0
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { resolution } = this.state;

    const { map } = init({
      wrapper: this.wrapper,
      layers: [new TileLayer("http://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=40")],
      centerPoint: new Point([55.7417, 37.6275]),
      resolution
    });

    map.maxResolution = 9601;
    this.map = map;
    this.setState({ zoomLvl: this.getLevel(resolution) });
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

  onFilterChange = value => {
    console.info("--> onFilterChange ggwp", value);
  }

  render() {
    const { resolution, zoomLvl } = this.state;

    return (
      <MapWrapper innerRef={this.onRef}>
        <Filters onFilterChange={this.onFilterChange} />
        <Controls>
          <ScaleControl zoomLvl={zoomLvl} onZoom={this.onZoom} resolution={resolution} />
          <GridLegend />
        </Controls>
      </MapWrapper>
    );
  }
}
