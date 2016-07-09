/**
 * Created by yunying on 2016/7/8.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }

    var SimpleNumberInput = fConstructor;
    SimpleNumberInput.prototype.init = fInit;
    SimpleNumberInput.prototype.initEvents = fInitEvents;
    SimpleNumberInput.prototype.initBoundary = fInitBoundary;
    SimpleNumberInput.prototype.setValue = fSetValue;
    SimpleNumberInput.prototype.render = fRender;
    SimpleNumberInput.prototype.onBtnMinClick = fOnBtnMinClick;
    SimpleNumberInput.prototype.onBtnAddClick = fOnBtnAddClick;
    SimpleNumberInput.prototype.onInputBlur = fOnInputBlur;
    SimpleNumberInput.prototype.checkBoundary = fCheckBoundary;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.unit = oConf.unit || 1;
        this.step = oConf.step || this.unit;
        this.init();
        return this;
    }

    function fInit(){
        this.initBoundary();
        this.setValue(this.config.value);
        this.render();
        this.initEvents();
        this.checkBoundary();
    }

    function fInitEvents() {
        var that = this;
        Helper.listenEvent(this.target, 'click', function (oEvent) {
            var oClickDom = oEvent.target || oEvent.srcElement;
            if(/simple-number-input-min/.test(oClickDom.className)){
                that.onBtnMinClick();
            }
            if(/simple-number-input-add/.test(oClickDom.className)){
                that.onBtnAddClick();
            }
        });
        Helper.listenEvent(this.input, 'blur', function (oEvent) {
            that.onInputBlur();
        });
    }

    function fInitBoundary() {
        var nMin = this.config.min || 0;
        var nMax = this.config.max || 0;
        this.min = nMin > nMax ? nMax : nMin;
        this.max = nMin > nMax ? nMin : nMax;
    }

    function fSetValue(nValue) {
        this.value = nValue || 0;
        this.value = this.value - (this.value % this.unit);
        if(nValue > this.max){
            this.value = this.max;
        }
        if(nValue < this.min){
            this.value = this.min;
        }
        return this.value;
    }

    function fRender() {
        this.btnMin = oDoc.createElement('button');
        this.btnMin.innerHTML = '-';
        this.btnMin.className = 'simple-number-input-min';

        this.btnAdd = oDoc.createElement('button');
        this.btnAdd.className = 'simple-number-input-add';
        this.btnAdd.innerHTML = '+';

        this.input = oDoc.createElement('input');
        this.input.className = 'simple-number-input-num';
        this.input.value = this.value;

        this.target.appendChild(this.btnMin);
        this.target.appendChild(this.input);
        this.target.appendChild(this.btnAdd);
    }

    function fOnBtnMinClick() {
        this.input.value = this.setValue(this.value - this.step);
        this.checkBoundary();
    }

    function fOnBtnAddClick() {
        this.input.value = this.setValue(this.value + this.step);
        this.checkBoundary();
    }

    function fOnInputBlur() {
        this.input.value = this.setValue(this.input.value);
        this.checkBoundary();
    }

    function fCheckBoundary() {
        if(this.value == this.min){
            this.btnMin.className = 'simple-number-input-min simple-number-input-min-disable';
        }
        if(this.value == this.max){
            this.btnAdd.className = 'simple-number-input-add simple-number-input-add-disable';
        }
        if(this.value < this.max){
            this.btnAdd.className = 'simple-number-input-add';
        }
        if(this.value > this.min){
            this.btnMin.className = 'simple-number-input-min';
        }
    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleNumberInput;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleNumberInput(oConf);
        };
        module.exports.SimpleNumberInput = SimpleNumberInput;
    } else {
        if(!oWin.SimpleNumberInput){
            oWin.SimpleNumberInput = SimpleNumberInput;
        }else{
            throw new Error("It's duplicate to defined 'SimpleNumberInput', please check the scripts which you has been imported!");
        }
    }

})(window, document);