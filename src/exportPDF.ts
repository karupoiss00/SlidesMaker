import {jsPDF} from 'jspdf';
import {SlidesMaker} from "./model/SlidesMaker";
import {getConfig} from "./StateManager";

function exportPDF(app: SlidesMaker) {

    const appConfig = getConfig();
    const slideSize = [appConfig.slideSize.width, appConfig.slideSize.height];

    const doc = new jsPDF({
        unit: "px",
        orientation: 'l',
        format: slideSize,
    });

    //foreach по слайдам
        //функция: добавления в doc слайда
            //функция: добавление объекта в doc
}