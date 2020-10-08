import { Colors } from './Colors';

export type Style = {
	backgroundColor: Colors;
	strokeColor: Colors;
	strokeWidth: number;
};

function createStyle(): Style {
    return {
        backgroundColor: Colors.WHITE,
        strokeColor: Colors.BLACK,
        strokeWidth: 2,
    };
}

export { createStyle };