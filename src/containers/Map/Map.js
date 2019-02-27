import React, { Component } from "react";
import { SpatialProcessor } from "@evergis/sp-api/SpatialProcessor";
import { Bbox } from "sgis/Bbox";
import { Polygon } from "sgis/features/Polygon";
import { FeatureLayer } from "sgis/layers/FeatureLayer";
import { PointSymbol } from "sgis/symbols/point/Point";
import { MaskedImage } from "sgis/symbols/point/MaskedImage";
import { PointFeature } from "sgis/features/PointFeature";
import { Connector } from "evergis/Connector";
import { DataViewService } from "evergis/services/DataViewService";
import { MapService } from "evergis/services/MapService";
import { ServiceContainer } from "evergis/services/ServiceContainer";
import { ServiceGroupService } from "evergis/services/ServiceGroupService";
import { StaticSourceService } from "evergis/services/StaticSourceService";
import { TileService } from "evergis/services/TileService";

import circleBack from "./circle_back.png";
import starImage from "./star.png";
import { MapWrapper } from "./styled";
import { License } from "../../components/License/License";
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
    selectedType: "fish",
    selectedObjectIndex: 0,
    objects: []
  };

  selectedSymbol = new MaskedImage({
    width: 32,
    height: 32,
    anchorPoint: [16, 16],
    imageSource: circleBack,
    maskSource: starImage,
    maskColor: "#e00f00"
  });

  layer = new FeatureLayer();

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.map.off("bboxChangeEnd", this.onBboxChangeEnd);
    this.map.off("click", this.onMapClick);
  }

  componentDidUpdate(
    prevProps,
    { selectedType: prevSelectedType, selectedFilter: prevSelectedFilter, selectedObjectIndex: prevSelectedObjectIndex }
  ) {
    const { selectedType, selectedFilter, selectedObjectIndex, objects } = this.state;

    if (prevSelectedType !== selectedType) {
      this.filterLayersByType(prevSelectedType);
    }

    if (prevSelectedFilter !== selectedFilter) {
      this.filterLayersByValue(prevSelectedFilter);
    }

    if (prevSelectedObjectIndex !== selectedObjectIndex) {
      const nextObject = objects[selectedObjectIndex];
      const nextPosition = nextObject && nextObject.position;

      if (nextPosition) {
        this.setSelectedSymbol(nextPosition);
      }
    }
  }

  setObjects = features => {
    if (features.length === 0) {
      this.layer.features = [];
      this.setState({ objects: [], selectedObjectIndex: 0 });
    } else {
      const objects = [];
      features.forEach((feature, index) => {
        const { attributes, bbox, position } = feature;
        const { name, address, site, site_2gis, phone, rubrics_te } = attributes;
        const { xMin, xMax, yMax, yMin } = bbox;

        if (index === 0) {
          this.setSelectedSymbol(position);
        }

        objects.push({
          position,
          name,
          address,
          site,
          site_2gis,
          phone,
          rubrics_te,
          extent: {
            xMin,
            xMax,
            yMax,
            yMin
          }
        });
      });

      this.setState({ objects, selectedObjectIndex: 0 });
    }
  };

  setSelectedSymbol = position => {
    const Point = new PointFeature(position, { symbol: this.selectedSymbol, crs: this.map.crs });
    this.layer.features = [];
    this.layer.add([Point]);
  };

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

    this.sp.connector.api
      .pickByGeometry({
        geometry,
        resolution,
        services: [service]
      })
      .then(features => this.setObjects(features))
      .catch(error => console.error(error));
  };

  init() {
    const { resolution, selectedType, selectedFilter } = this.state;

    const sp = new SpatialProcessor({
      url: "http://public.everpoint.ru/sp/",
      services: [layerStamenToner, layers[selectedFilter][selectedType]],
      mapWrapper: this.wrapper,
      resolution
    });

    const { map, painter, layerManager } = sp;

    map.maxResolution = 9444;
    map.on("bboxChangeEnd", this.onBboxChangeEnd);
    map.on("click", this.onMapClick);
    map.addLayer(this.layer);
    this.map = map;
    this.sp = sp;
    this.painter = painter;
    this.layerManager = layerManager;
  }

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
    const isGridZoomLvl = zoomLvl < 14 || zoomLvl === 0;

    this.setState({
      zoomLvl: this.getLevel(resolution),
      resolution,
      selectedType: zoomLvl < 14 || zoomLvl === 0 ? "fish" : "poi"
    });

    if (isGridZoomLvl) {
      this.onCloseObjectCard();
    }
  };

  onRefMapWrapper = ref => (this.wrapper = ref);

  onZoom = value => {
    this.map.zoom(value);
  };

  onZoomToPoints = () => this.map.animateTo(new PointFeature([55.7417, 37.6275]), 8);

  getLevel = resolution => {
    const index = this.map && this.map.tileScheme.getLevel(resolution);

    if (index) {
      return this.map.tileScheme.levels[index].zIndex;
    }
  };

  onFilterChange = selectedFilter => {
    this.setState({ selectedFilter });
    this.onCloseObjectCard();
  };

  zoomToFeature = extent => {
    const { xMin, xMax, yMax, yMin } = extent;
    const bbox = new Bbox([xMin, yMax], [xMax, yMin], this.map.crs);
    this.painter.show(bbox, true);
  };

  onCloseObjectCard = () => {
    this.layer.features = [];
    this.setState({ selectedObjectIndex: 0, objects: [] });
  };

  render() {
    const { resolution, zoomLvl, selectedFilter, selectedType, objects, selectedObjectIndex } = this.state;

    const isGridType = selectedType === "fish";

    return (
      <MapWrapper innerRef={this.onRefMapWrapper}>
        <Filters
          isVisible={isGridType}
          value={selectedFilter}
          onFilterChange={this.onFilterChange}
          onZoomToPoints={this.onZoomToPoints}
        />
        <ObjectCard
          isVisible={objects.length}
          currentPage={selectedObjectIndex + 1}
          pageCount={objects.length}
          zoomToFeature={this.zoomToFeature}
          onClose={this.onCloseObjectCard}
          onPrevObject={() => this.setState({ selectedObjectIndex: selectedObjectIndex - 1 })}
          onNextObject={() => this.setState({ selectedObjectIndex: selectedObjectIndex + 1 })}
          {...objects[selectedObjectIndex]}
        />
        <Controls>
          <ScaleControl zoomLvl={zoomLvl} onZoom={this.onZoom} resolution={resolution} />
          <GridLegend isVisible={isGridType} />
        </Controls>
        <License />
      </MapWrapper>
    );
  }
}
