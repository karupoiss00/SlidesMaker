import {jsPDF} from 'jspdf';
import {getAppState, getConfig} from "./StateManager";
import {TextBox} from "./model/slide/slide_objects/textbox/TextBox";
import {Shape} from "./model/slide/slide_objects/shape/Shape";
import {Picture} from "./model/slide/slide_objects/picture/Picture";
import {ShapeType} from "./model/slide/slide_objects/shape/ShapeType";
import {SlideObjectType} from "./model/slide/Slide";
import {SlidesMakerSlideType} from "./model/SlidesMaker";

function getBase64FromPicture(image: Picture): Promise<string> {
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => {
        const img: HTMLImageElement = new Image(image.rect.width, image.rect.height);
        img.src = image.src;
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.rect.width;
            canvas.height = image.rect.height;
            if (ctx)
                ctx.drawImage(img, 0, 0);
            const uri = canvas.toDataURL('image/png');
            resolve(uri);
        };
    });
}

async function addObjectOnPage(doc: jsPDF, object: TextBox | Shape | Picture) {
    // eslint-disable-next-line no-undef,no-async-promise-executor
    return new Promise(async (resolve) => {
        if ('text' in object) {
            doc.setFontSize(object.font.fontSize);
            doc.setTextColor(object.font.fontColor);
            doc.setFont(object.font.fontName, object.font.isBold ? "bold" : "normal");
            doc.text(object.text, object.rect.x, object.rect.y);
        }
        if ('shapeType' in object) {
            doc.setDrawColor(object.style.strokeColor);
            doc.setFillColor(object.style.backgroundColor)
            doc.setLineWidth(object.style.strokeWidth);
            const drawingMode = 'FD'; //DrawFill
            if (object.shapeType == ShapeType.RECTANGLE) {
                doc.rect(
                    object.rect.x,
                    object.rect.y,
                    object.rect.width,
                    object.rect.height,
                    drawingMode);
            } else if (object.shapeType == ShapeType.TRIANGLE) {
                doc.triangle(object.rect.x + object.rect.width / 2,
                    object.rect.y,
                    object.rect.x,
                    object.rect.y + object.rect.height,
                    object.rect.x + object.rect.width,
                    object.rect.y + object.rect.height,
                    drawingMode);
            } else if (object.shapeType == ShapeType.ELLIPSE) {
                doc.ellipse(
                    object.rect.x + object.rect.width / 2,
                    object.rect.y + object.rect.height / 2,
                    object.rect.width / 2,
                    object.rect.height / 2,
                    drawingMode);
            }
        } else if ('src' in object) {
            const base64 = await getBase64FromPicture(object);

            doc.addImage(
                base64,
                'PNG',
                object.rect.x,
                object.rect.y,
                object.rect.width,
                object.rect.height
            );
        }
        resolve();
    });
}

async function addObjectsOnPage(doc: jsPDF, objects: Array<SlideObjectType>) {
    const promises = objects.map(async (slideObject) => {
        return addObjectOnPage(doc, slideObject.object);
    });
    // eslint-disable-next-line no-undef
    await Promise.all(promises);
}

async function setBackgroundImage(doc: jsPDF, image: Picture) {
    image.rect.width = 1500;
    image.rect.height = 800;
    const base64 = await getBase64FromPicture(image);
    console.log(image.rect);
    doc.addImage (
        base64,
        'jpg',
        0,
        0,
        1500,
        800,
    );
}

async function addSlides(doc: jsPDF, slides: Array<SlidesMakerSlideType>) {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i].slide;
        if (typeof(slide.background) == 'string')
        {
            doc.setFillColor(slide.background);
            doc.rect(
                0,
                0,
                getConfig().slideSize.width,
                getConfig().slideSize.height,
                'F'
            );
        }
        else
        {
            await setBackgroundImage(doc, slide.background);
        }
        await addObjectsOnPage(doc, slide.objects);
        doc.addPage();
    }
}

export async function exportPDF() {
    const appConfig = getConfig();
    const slidesMaker = getAppState();
    const slideSize = [appConfig.slideSize.width, appConfig.slideSize.height];
    const doc = new jsPDF({
        unit: "px",
        orientation: 'l',
        format: slideSize,
    });
    await addSlides(doc, slidesMaker.slideList)
    doc.deletePage(doc.getNumberOfPages());
    doc.save('test.pdf');
}