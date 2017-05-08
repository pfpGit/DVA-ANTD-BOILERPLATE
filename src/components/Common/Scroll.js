import React, {Component, PropTypes} from 'react';
import throttle from 'lodash/throttle';
import './Scroll.css';

/**
 * 计算浏览器的滚动条的宽度
 * @return {number} 浏览器滚动条的宽度
 */
function getScrollbarWidth() {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
        }, i, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.remove();
    return scrollbarWidth;
}


const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
//浏览器的滚动条的宽度
const SCROLL_BAR_WIDTH = getScrollbarWidth();

class ScrollView extends Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        overflow: PropTypes.oneOf(['auto', 'hidden', 'scroll']),
        overflowX: PropTypes.oneOf(['auto', 'hidden', 'scroll']),
        overflowY: PropTypes.oneOf(['auto', 'hidden', 'scroll'])
    }
    
    static defaultProps = {
        style: {},
        className: ''
    }

    constructor(props) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this), 30);
        this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 30);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.overflow = {
            x: 'auto',
            y: 'auto'
        }

        this.state = {
            pos: {
                top: 0,
                left: 0
            }
        }
    }

    componentDidMount() {
        
        const {
            overflow,
            overflowX,
            overflowY
        } = this.props;

        this.overflow = {
            x: overflowX || overflow || 'auto',
            y: overflowY || overflow || 'auto'
        }

        let showVertical = this.isVerticalShow();
        let showHorizontal = this.isHorzontalShow();

        let rootEl = this.refs.root;
        let containerEl = rootEl.querySelector('.ll-scroll-container');

        containerEl.style.right = -SCROLL_BAR_WIDTH + 'px';
        containerEl.style.bottom = -SCROLL_BAR_WIDTH + 'px';


        document.addEventListener('mousemove', this.handleMouseMove, false);
        document.addEventListener('mouseup', this.handleMouseUp, false);

        this.setState({});

        window.addEventListener('resize', this.refresh, false);
               
    }
    componentWillUnmount(){
        document.removeEventListener('mousemove', this.handleMouseMove, false);
        document.removeEventListener('mouseup', this.handleMouseUp, false);
        window.removeEventListener('resize', this.refresh, false);
        this.handleScroll.cancel();
        this.handleMouseMove.cancel();
    }
    isVerticalShow(){
        

        if(this.overflow.y==='scroll'){
            return true;
        }
        if(this.overflow.y==='hidden'){
            return false;
        }

        let rootEl = this.refs.root;

        let containerEl = rootEl.querySelector('.ll-scroll-container');

        let viewportH = containerEl.clientHeight;   
        let contentH = containerEl.scrollHeight;

        return contentH>viewportH;
    }

    isHorzontalShow() {
        if(this.overflow.x==='scroll'){
            return true;
        }
        if(this.overflow.x==='hidden'){
            return false;
        }

        let rootEl = this.refs.root;

        let containerEl = rootEl.querySelector('.ll-scroll-container');

        let viewportW = containerEl.clientWidth;   
        let contentW = containerEl.scrollWidth;

        return contentW>viewportW;
    }
    


    getStyle(){
        let rootEl = this.refs.root;

        if(!rootEl) {
            return {};
        }

        let showVertical = this.isVerticalShow();
        let showHorizontal = this.isHorzontalShow();

        let verTrackEl = rootEl.querySelector('.ll-scrollbar-track-vertical');
        let trackW = verTrackEl.offsetWidth;

        rootEl.style.paddingRight = showVertical ? trackW : 0 + 'px';
        rootEl.style.paddingBottom = showHorizontal ? trackW : 0 + 'px';

        

        let containerEl = rootEl.querySelector('.ll-scroll-container');
        let contentH = containerEl.scrollHeight;
        let contentW = containerEl.scrollWidth;

        let viewportW = containerEl.clientWidth;
        let viewportH = containerEl.clientHeight;
    

        let verTrackL = viewportH;
        let horTrackL = viewportW;

        let verThumbL = viewportH /contentH *verTrackL;

        let horThumbL = viewportW /contentW *horTrackL;

        this.iVerScroll = (contentH-viewportH)/(verTrackL-verThumbL);
        this.iHorScroll = (contentW-viewportW)/(horTrackL-horThumbL);


        return {
            root: {
                paddingRight: showVertical ? trackW : 0,
                paddingBottom: showHorizontal ? trackW : 0
            },
            verTrack: {
                display: showVertical ? 'block' : 'none',
                height: verTrackL
            },
            horTrack: {
                display: showHorizontal ? 'block' : 'none',
                width: horTrackL
            },
            verThumb: {
                height: verThumbL
            },
            horThumb: {
                width: horThumbL
            }

        };
        


    }

    handleScroll(ev) {

        var rootEl = this.refs.root;
        var containerEl = rootEl.querySelector('.ll-scroll-container');
        
        let showVertical = this.isVerticalShow();
        let showHorizontal = this.isHorzontalShow();

        let pos = {};

        if(showVertical){
            var scrollTop = containerEl.scrollTop;
            var iVerScroll = this.iVerScroll;
            pos.top = scrollTop/iVerScroll;
        }
        if(showHorizontal){
            var scrollLeft = containerEl.scrollLeft;
            var iHorScroll = this.iHorScroll;
            pos.left = scrollLeft/iHorScroll
        }
               

        this.setState({
            pos: pos
        })
    }
    refresh(){
        this.setState({});
    }
    handleMouseDown(direction, ev){

        var rootEl = this.refs.root;
        var containerEl = rootEl.querySelector('.ll-scroll-container');
        //确定是水平方向还是竖直方向的滚动条被激活
        this.activeThumb = direction;
        //记录鼠标点击时，container的scrollTop和scrollLeft当前的位置
        this.lastContainerScrollTop = containerEl.scrollTop;
        this.lastContainerScrollLeft = containerEl.scrollLeft;

        //记录鼠标点击时, 鼠标相对的浏览器窗口的坐标
        this.lastMousePos = {
            top: ev.clientY,
            left: ev.clientX
        }
    }
    handleMouseMove(ev){
        var rootEl = this.refs.root;
        var containerEl = rootEl.querySelector('.ll-scroll-container');


        if(this.activeThumb===VERTICAL){
            var disY = ev.clientY-this.lastMousePos.top;
            //之前的位置，加上变化的位置
            //注意这里改变container.scrollTop回触发onScroll事件，在onScroll中使用了
            //setState，同时又反作用在thumb上，所以这里并没有显示的修改thumb的top值
            containerEl.scrollTop = this.lastContainerScrollTop + disY * this.iVerScroll;

        }
        if(this.activeThumb===HORIZONTAL){
            var disX = ev.clientX-this.lastMousePos.left;
            containerEl.scrollLeft = this.lastContainerScrollLeft + disX * this.iHorScroll;
        }

    }
    handleMouseUp(){
        this.lastMousePos = null;
        this.activeThumb = null;
        this.lastContainerScrollTop = null;
        this.lastContainerScrollLeft = null;
    }

    render() {

        const {
            children,
            className,
            style
        } = this.props;
        let styles = this.getStyle();
        return (
            <div className={'ll-scroll '+className } ref="root" style={Object.assign(styles.root||{}, style)}>
                <div className="ll-scroll-wrap">
                    <div className="ll-scroll-container" onScroll={this.handleScroll}>
                    {children}
                    </div>
                </div>
                <div className="ll-scrollbar-track-vertical" style={styles.verTrack}>
                    <div className="ll-scrollbar-thumb-vertical" style={Object.assign(styles.verThumb||{}, {top: this.state.pos.top})} onMouseDown={this.handleMouseDown.bind(this,VERTICAL)}></div>
                </div>
                <div className="ll-scrollbar-track-horizontal" style={styles.horTrack}>
                    <div className="ll-scrollbar-thumb-horizontal" style={Object.assign(styles.horThumb||{}, {left: this.state.pos.left})} onMouseDown={this.handleMouseDown.bind(this,HORIZONTAL)}></div>
                </div>
            </div>
        );
    }
}

export default ScrollView;