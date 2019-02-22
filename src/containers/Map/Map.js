import React, { Component } from "react";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
import axios from "axios";
// TODO fix evergis service modules side effects
import { Bbox } from "sgis/Bbox";
import { Polygon } from "sgis/features/Polygon";
import { PointFeature } from "sgis/features/PointFeature";
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

const layers = {
  1: {
    fish: "layer_a8c5ffe2949e4011a532ecd53ec903db",
    poi: "layer_a3be7c1ebc384695ac2a80088f82476e"
  },
  2: {
    fish: "layer_05cc7b1cce804318b2a65d459ef35d99",
    poi: "layer_3576be5d0250480fb8a1beccb1dc63a6"
  },
  3: {
    fish: "layer_68c5103d2c254e25921eb47a7c212fcf",
    poi: "layer_4fca37f171274595832729a83a3c0ffc"
  },
  4: {
    fish: "layer_7ab22ac5b37a4d02b672c5ddfa7e9d3a",
    poi: "layer_4e19bdfc18f24b53b1107a6aa4d52392"
  },
  5: {
    fish: "layer_1cb2a0c680aa46d5adc4d6fd815a10ad",
    poi: "layer_71fc40594d8e4337a80ec0f466e44c80"
  }
};

export class Map extends Component {
  state = {
    resolution: 200,
    zoomLvl: 9,
    selectedFilter: "1",
    selectedType: "fish"
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const { resolution, selectedType, selectedFilter } = this.state;

    const sp = new SpatialProcessor({
      url: "http://public.everpoint.ru/sp/",
      services: [layerStamenToner, layers[selectedFilter][selectedType]],
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
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
    this.map.off("click", this.onMapClick);
  }

  componentDidUpdate(prevProps, { selectedType: prevSelectedType, selectedFilter: prevSelectedFilter }) {
    const { selectedType, selectedFilter } = this.state;

    if (prevSelectedType !== selectedType) {
      this.filterLayersByType(prevSelectedType);
    }

    if (prevSelectedFilter !== selectedFilter) {
      this.filterLayersByValue(prevSelectedFilter);
    }
  }

  onMapClick = ({ point }) => {
    const { selectedFilter, selectedType } = this.state;

    if (selectedType === "fish") return;

    const resolution = this.map.resolution;

    const service = layers[selectedFilter][selectedType];

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

    geometry.symbol.type = "SimplePolygonSymbol";

    // const geometry = new PointFeature([point.y, point.x], { crs: point.crs });

    const normilizeBody = data => {
      if (data instanceof FormData || typeof data === "string") {
        return data;
      } else {
        return JSON.stringify(data);
      }
    };

    axios
      .get("http://public.everpoint.ru/sp/api/data/pickByGeometry", {
        geom: [geometry],
        res: resolution,
        services: [service],
        tol: 20
      })
      .then(res => {
        const body = normilizeBody(res.body);
        console.info("--> res data ggwp", res);
        console.info("--> body ggwp 4444", body);
      })
      .catch(error => console.info("--> error ggwp 4444", error));
    //
    // this.sp.connector.api
    //   .pickByGeometry({
    //     geometry,
    //     resolution,
    //     services: [service]
    //   })
    //   .then(res => {
    //     console.info("--> ggwp 4444", res);
    //   })
    //   .catch(error => {
    //     console.info("--> error ggwp 4444", error);
    //   });

    const objectSelector = this.controller.getController("objectSelector");

    // objectSelector["pickByGeometry"]({
    //   geometry,
    //   resolution,
    //   services: servicesNames
    // })
    //   .then(res => {
    //     console.info("--> res ggwp 4444", res);
    //   })
    //   .catch(error => {
    //     console.info("--> error ggwp 4444", error);
    //   });
  };

  filterLayersByType = prevType => {
    const { selectedFilter, selectedType } = this.state;

    const hideLayerName = layers[selectedFilter][prevType];
    const visibleLayerName = layers[selectedFilter][selectedType];

    const services = this.layerManager.getServices(true);

    const layersIsNotLoaded = !services.some(({ name }) => name === visibleLayerName);

    if (layersIsNotLoaded) {
      this.layerManager.loadService(visibleLayerName);
    }

    services.forEach(({ layer, name }) => {
      if (name === hideLayerName) {
        layer.isDisplayed = false;
      } else if (name === visibleLayerName) {
        layer.isDisplayed = true;
      }
    });
  };

  filterLayersByValue = prevValue => {
    const { selectedFilter, selectedType } = this.state;

    const services = this.layerManager.getServices(true);
    const prevLayerName = layers[prevValue][selectedType];
    const nextLayerName = layers[selectedFilter][selectedType];
    const nextLayerIsNotLoaded = !services.some(({ name }) => name === nextLayerName);

    if (nextLayerIsNotLoaded) {
      this.layerManager.loadService(nextLayerName);
    }

    services.forEach(({ layer, name }) => {
      if (name === prevLayerName) {
        layer.isDisplayed = false;
      } else if (name === nextLayerName) {
        layer.isDisplayed = true;
      }
    });
  };

  onBboxChangeEnd = () => {
    const resolution = this.map.resolution;

    const zoomLvl = this.getLevel(resolution);

    this.setState({
      zoomLvl: this.getLevel(resolution),
      resolution,
      selectedType: zoomLvl < 14 || zoomLvl === 0 ? "fish" : "poi"
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

  render() {
    const { resolution, zoomLvl, selectedFilter, selectedType } = this.state;

    return (
      <MapWrapper innerRef={this.onRefMapWrapper}>
        <Filters value={selectedFilter} onFilterChange={this.onFilterChange} selectedType={selectedType} />
        <ObjectCard zoomToFeature={this.zoomToFeature} onClose={this.onCloseObjectCard} />
        <Controls>
          <ScaleControl zoomLvl={zoomLvl} onZoom={this.onZoom} resolution={resolution} />
          <GridLegend />
        </Controls>
      </MapWrapper>
    );
  }
}
