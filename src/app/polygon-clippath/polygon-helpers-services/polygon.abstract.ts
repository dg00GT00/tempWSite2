import {PolygonConfig} from '../../../models/polygon-shape.types';

type TConfig<T, K = keyof T> = K extends keyof PolygonConfig ? T : null;

export abstract class PolygonAbstractConfig<TConfigSides, TReturn> {

    protected abstract configLeftSide(configSide?: TConfig<TConfigSides>): TReturn;

    protected abstract configRightSide(configSide?: TConfig<TConfigSides>): TReturn;

    protected abstract configBothSides(configSides?: TConfig<TConfigSides>): TReturn;

    dispatchClipSides(clipConfig?: TConfig<TConfigSides>): TReturn {
        if (clipConfig) {
            // @ts-ignore
            if (clipConfig.Both) {
                return this.configBothSides(clipConfig);
            }
            // @ts-ignore
            if (clipConfig.Left) {
                return this.configLeftSide(clipConfig);
            }
            // @ts-ignore
            if (clipConfig.Right) {
                return this.configRightSide(clipConfig);
            }
        }
    }
}
