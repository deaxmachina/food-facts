/*
const dataRaw = [
  { id:0, name: 'Frozen yoghurt', calories: 159, fat: 5, carbs: 85, protein:34, fiber: 10 },
  { id:1, name: 'Ice cream sandwich', calories: 237, fat: 33, carbs: 23, protein: 100, fiber: 20 },
  { id:2, name: 'Eclair', calories: 262, fat: 4, carbs: 45, protein:6, fiber: 30 }
*/

function dataTransform(dataRaw){
  if (dataRaw.length !==0) {
    const dataAttr = ["food", "PROCNT", "FIBTG","FAT", "ENERC_KCAL", "CHOCDF"]
    const food = dataRaw.map(obj => obj.food)
    const proteins = dataRaw.map(obj => obj.PROCNT)
    const fiber = dataRaw.map(obj => obj.FIBTG)
    const fat = dataRaw.map(obj => obj.FAT)
    const calories = dataRaw.map(obj => obj.ENERC_KCAL)
    const carbs = dataRaw.map(obj => obj.CHOCDF)
    const dataFormatted = {food, proteins, fiber, fat, calories, carbs}
    //const dataFormatted = {food, proteins, fiber, fat, carbs}
    
    const nutrients = ["calories", "fat", "carbs", "proteins", "fiber"]
    //const nutrients = ["fat", "carbs", "proteins", "fiber"]
    let dataTransformed = []
    for (const nurt of nutrients) {
      var result = {};
      dataFormatted.food.forEach((id, i) => result[id] = dataFormatted[nurt][i]);
      dataTransformed.push({nutrient: nurt, ...result, max: Math.max(...dataFormatted[nurt])})
    };
    return dataTransformed
  } else {
    return dataRaw
  }
};

export default dataTransform; 
