import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";

import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

/*touches: detect user touches
time: predict and update app according to position
dispatch: updating score
*/
const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine

    Matter.Engine.update(engine, time.delta)

    for (let index = 1; index <= 2; index++) {

        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
            entities[`ObstacleTop${index}`].point = true
            dispatch({ type: 'new_point' })

        }


        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos)

            entities[`ObstacleTop${index}`].point = false
        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: -3, y: 0 })
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, { x: -3, y: 0 })
    }


    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({ type: 'game_over' })
    })
    return entities;
}
export default Physics