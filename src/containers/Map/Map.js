import React, { Component } from "react";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
// TODO fix evergis service modules side effects
import { Bbox } from "sgis/Bbox";
import { Polygon } from "sgis/features/Polygon";
import { Connector } from "evergis/Connector";
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

const layerStamenToner = "stamen_toner";
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
      services: [layerStamenToner, poi, grid],
      mapWrapper: this.wrapper,
      resolution
    });

    const { map, painter, layerManager, controllerManager } = sp;

    map.maxResolution = 9444;
    map.on("bboxChangeEnd", this.onBboxChangeEnd);
    map.on("click", this.onMapClick);
    this.map = map;
    this.sp = sp;
    this.painter = painter;
    this.layerManager = layerManager;
    this.controller = controllerManager;
    console.info("--> SP ggwp 4444", sp);
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
    this.map.off("click", this.onMapClick);
  }

  onBboxChangeEnd = () => {
    const resolution = this.map.resolution;

    this.layerManager.getServices(true).forEach(({ layer }, index) => {
      if (index === 2) {
        layer.isDisplayed = false;
      }
    });

    this.setState({
      zoomLvl: this.getLevel(resolution),
      resolution
    });
  };

  onRefMapWrapper = ref => (this.wrapper = ref);

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

  zoomToFeature = () => {
    const extent = {
      // xmin: currentTreeItem.Envelope.MinX,
      // ymin: currentTreeItem.Envelope.MinY,
      // xmax: currentTreeItem.Envelope.MaxX,
      // ymax: currentTreeItem.Envelope.MaxY,
      xmin: 44,
      ymin: 45,
      xmax: 22,
      ymax: 14
    };

    const { xmin, xmax, ymax, ymin } = extent;
    const bbox = new Bbox([xmin, ymax], [xmax, ymin], this.map.crs);
    this.painter.show(bbox, true);
  };

  onCloseObjectCard = () => {
    console.info("--> onCloseObjectCard ggwp");
  };

  onMapClick = ({ point }) => {
    const resolution = this.map.resolution;

    const services = this.layerManager.getServices(true);

    const servicesNames = services.map(({ name }) => name);

    const buffer = resolution * 20;
    const geometry = new Polygon(
      [
        [
          [point.x - buffer, point.y - buffer],
          [point.x + buffer, point.y - buffer],
          [point.x + buffer, point.y + buffer],
          [point.x - buffer, point.y + buffer]
        ]
      ],
      { crs: point.crs }
    );

    const objectSelector = this.controller.getController("objectSelector");

    objectSelector["select"]({
      geometry,
      resolution,
      services: servicesNames
    })
      .then(res => {
        console.info("--> res ggwp 4444", res);
      })
      .catch(error => {
        console.info("--> error ggwp 4444", error);
      });
  };

  render() {
    const { resolution, zoomLvl, selectedFilter } = this.state;

    return (
      <MapWrapper innerRef={this.onRefMapWrapper}>
        <Filters value={selectedFilter} onFilterChange={this.onFilterChange} />
        <ObjectCard zoomToFeature={this.zoomToFeature} onClose={this.onCloseObjectCard} />
        <Controls>
          <ScaleControl zoomLvl={zoomLvl} onZoom={this.onZoom} resolution={resolution} />
          <GridLegend />
        </Controls>
      </MapWrapper>
    );
  }
}
