import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import swal from 'sweetalert2';
import Icon from '@mdi/react';
import {
  mdiArrowTopRightThick,
  mdiDownload,
  mdiMagnifyPlusOutline
} from '@mdi/js';
import Load from './common/Loader';
import Checkbox from './common/Checkbox';
import TextInput from './common/TextInput';
import color from '../utils/colors';
import 'animate.css/animate.min.css';

const Main = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 3px;
  margin-bottom: 15px;
  overflow: hidden;
  background-size: 145px;
  background-color: ${color.voyagerDarkGrey};
  position: relative;
  box-shadow: 0 2px 4px 0
    ${({ checked }) => (checked ? 'rgba(22, 130, 78, 4)' : 'rgba(0, 0, 0, 4)')};

  :hover {
    box-shadow: 0 8px 16px 0
      ${({ checked }) =>
        checked ? 'rgba(22, 130, 78, .16)' : 'rgba(0, 0, 0, .16)'};
  }
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  user-select: none;
  cursor: pointer;
  max-width: 100%;
  min-width: 100%;
  border-style: none;
  border-radius: 3px 3px 0 0;
  opacity: ${({ opacity }) => opacity};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
`;

const SizeBox = styled.div`
  width: 100%;
  height: 40px;
  user-select: none;

  opacity: 0;
  background: rgb(51, 51, 51);
  background: linear-gradient(
    0deg,
    rgba(51, 51, 51, 0.3376244388409515) 73%,
    rgba(255, 255, 255, 0) 100%
  );

  position: absolute;
  bottom: 92px;
  z-index: 1;

  p {
    color: #e0e0e0;
    text-align: end;
    font-size: 1rem;
    font-weight: 600;
    margin-right: 8px;
  }
`;

const Footer = styled.div`
  background-color: ${props => props.background};
  padding-top: 12px;
  transition: background-color 0.25s;
  box-shadow: 0 0 black;
  margin-top: -20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 3px 3px;
`;

const Title = styled.div`
  width: ${({ width }) => width};
  max-height: 45px;
  font-weight: 600;
  line-height: 1.14;
  font-size: 14px;
  text-align: left;
  color: white;
  display: inline-block;
  padding: 0 15px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  color: hsla(0, 0%, 100%, 0.6);
  min-height: 8px;
`;

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  opacity: 0.65;
  padding-top: 6px;
  padding-bottom: 12px;
  flex: 1;
  justify-content: center;
  cursor: pointer;

  &&:hover {
    color: white;
    opacity: 1;
  }
`;

const emptyFunc = () => {};

const onZoomButtonClick = url => {
  swal({
    showConfirmButton: false,
    background: `rgba(0, 0, 0, 0)`,
    imageUrl: url,
    animation: false
  });
};

export default observer(
  class Card extends Component {
    static propTypes = {
      imageModel: PropTypes.object,
      onZoomButtonClick: PropTypes.func,
      onOpenTabClick: PropTypes.func,
      onDownloadButtonClick: PropTypes.func,
      onCheckboxClick: PropTypes.func,
      onLoad: PropTypes.func,
      onError: PropTypes.func
    };

    static defaultProps = {
      imageModel: {},
      onZoomButtonClick: onZoomButtonClick,
      onOpenTabClick: emptyFunc,
      onDownloadButtonClick: emptyFunc,
      onCheckboxClick: emptyFunc,
      onLoad: emptyFunc,
      onError: emptyFunc
    };

    constructor(props) {
      super(props);

      this.footer = React.createRef();

      this.state = {
        visible: false,
        isLoaded: false,
        footerHeight: 0,
        imageOpacity: 0.95,
        sizeboxAnimation: '',
        hooterColor: color.titleGreyDefault,
        zoomColor: color.paleGrey,
        openTabColor: color.paleGrey,
        downloadColor: color.paleGrey,
        checkboxColor: color.orionGreen
      };
    }

    componentDidMount() {
      this.setState({ footerHeight: this.getFooterHeight() });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.state.footerHeight !== prevState.footerHeight) {
        this.setState({ footerHeight: this.getFooterHeight() });
      }
    }

    getFooterHeight = () => {
      const { footer } = this;
      if (footer.current == null) {
        return 0;
      }

      return footer.current.clientHeight;
    };

    onLoad = e => {
      const { imageModel, onLoad } = this.props;

      onLoad(e, imageModel);
      this.setState({ visible: true, isLoaded: true });
    };

    onError = e => {
      const { imageModel, onError } = this.props;
      onError(e, imageModel);
    };

    onImageClick = () => {
      const { imageModel, onCheckboxClick } = this.props;
      onCheckboxClick(imageModel);
    };

    onImageHover = () => {
      this.setState({ imageOpacity: 1 });
    };

    onImageLeave = () => {
      this.setState({ imageOpacity: 0.95 });
    };

    onHover = () => {
      this.setState({
        sizeboxAnimation: 'animated fadeIn',
        hooterColor: color.titleGreyLight
      });
    };

    onLeave = () => {
      this.setState({
        sizeboxAnimation: 'animated fadeOut',
        hooterColor: color.titleGreyDefault
      });
    };

    onClickZoom = () => {
      const { imageModel, onZoomButtonClick } = this.props;
      onZoomButtonClick(imageModel);
    };

    onMouseOverZoom = () => {
      this.setState({ zoomColor: color.starfleetMediumGrey });
    };

    onMouseLeaveZoom = () => {
      this.setState({ zoomColor: color.paleGrey });
    };

    onClickOpenTab = () => {
      const { imageModel, onOpenTabClick } = this.props;
      onOpenTabClick(imageModel);
    };

    onMouseOverOpenTab = () => {
      this.setState({ openTabColor: color.starfleetMediumGrey });
    };

    onMouseLeaveOpenTab = () => {
      this.setState({ openTabColor: color.paleGrey });
    };

    onClickDownload = () => {
      const { imageModel, onDownloadButtonClick } = this.props;
      onDownloadButtonClick(imageModel);
    };

    onMouseOverDownload = () => {
      this.setState({ downloadColor: color.starfleetMediumGrey });
    };

    onMouseLeaveDownload = () => {
      this.setState({ downloadColor: color.paleGrey });
    };

    onClickCheckbox = () => {
      const { imageModel, onCheckboxClick } = this.props;
      onCheckboxClick(imageModel);
    };

    onMouseOverCheckbox = () => {
      this.setState({ checkboxColor: color.darkMintGreen });
    };

    onMouseLeaveCheckbox = () => {
      this.setState({ checkboxColor: color.orionGreen });
    };

    render() {
      const { imageModel } = this.props;

      const {
        visible,
        isLoaded,
        footerHeight,
        imageOpacity,
        sizeboxAnimation,
        zoomColor,
        openTabColor,
        downloadColor,
        checkboxColor,
        hooterColor
      } = this.state;

      return (
        <Main
          visible={imageModel.visible}
          onMouseOver={this.onHover}
          onMouseLeave={this.onLeave}
        >
          <Wrapper checked={imageModel.checked}>
            <ImgWrapper>
              <Img
                src={imageModel.src}
                alt={imageModel.src}
                visible={visible}
                loading={'lazy'}
                async={true}
                paddingBottom={footerHeight}
                opacity={imageOpacity}
                onLoadStart={this.onLoad}
                onLoad={this.onLoad}
                onError={this.onError}
                onClick={this.onImageClick}
                onDoubleClick={this.onClickZoom}
                onMouseOver={this.onImageHover}
                onMouseLeave={this.onImageLeave}
              />

              {imageModel.loaded ? (
                <SizeBox
                  className={sizeboxAnimation}
                  onClick={this.onImageClick}
                  onDoubleClick={this.onClickZoom}
                >
                  <p>
                    {imageModel.width} × {imageModel.height}
                  </p>
                </SizeBox>
              ) : null}

              {isLoaded ? null : <Load />}
            </ImgWrapper>

            <Footer background={hooterColor} ref={this.footer}>
              <Title width={'79%'}>
                <TextInput value={imageModel.url} disabled />
              </Title>

              <Actions>
                {/* zoom button */}
                <Action
                  onMouseOver={this.onMouseOverZoom}
                  onMouseLeave={this.onMouseLeaveZoom}
                  onClick={this.onClickZoom}
                >
                  <Icon
                    path={mdiMagnifyPlusOutline}
                    size={1}
                    color={zoomColor}
                  />
                </Action>

                {/* open image on new tab */}
                <Action
                  onMouseOver={this.onMouseOverOpenTab}
                  onMouseLeave={this.onMouseLeaveOpenTab}
                  onClick={this.onClickOpenTab}
                >
                  <Icon
                    path={mdiArrowTopRightThick}
                    size={1}
                    color={openTabColor}
                  />
                </Action>

                {/* download button */}
                <Action
                  onMouseOver={this.onMouseOverDownload}
                  onMouseLeave={this.onMouseLeaveDownload}
                  onClick={this.onClickDownload}
                >
                  <Icon path={mdiDownload} size={1} color={downloadColor} />
                </Action>

                {/* checkbox */}
                <Action
                  onMouseOver={this.onMouseOverCheckbox}
                  onMouseLeave={this.onMouseLeaveCheckbox}
                  onClick={this.onClickCheckbox}
                >
                  <Checkbox
                    checked={imageModel.checked}
                    color={checkboxColor}
                  />
                </Action>
              </Actions>
            </Footer>
          </Wrapper>
        </Main>
      );
    }
  }
);
