import ActiveStatusEffect from '../models/ActiveStatusEffect.js';
import AutoEvaluationData from './AutoEvaluation.js';
import PassiveStatusEffect from '../models/PassiveStatusEffect.js';
import Player from '../models/Player.js';
import EffectCalculator from './EffectCalculator.js';
import Effect from '../models/Effect.js';
import { effect } from 'vue';

export class EvaluationCalculator {
  static calc_good_impression_score(n, k) {
    if (n === 0) return 0;
    let steps = Math.min(k, n + 1);
    return (steps * (n + (n - (steps - 1)))) / 2;
  }

  /**
   *
   * @param {ActiveStatusEffect} status
   * @param {Player} player
   * @returns
   */
  static calcActiveEvaluation(status, player) {
    let total = AutoEvaluationData.get_trigger_evaluation(status, player);
    switch (status.name) {
      case 'アクティブスキルカード使用時固定元気+2':
          var effect = new Effect({ type: 'genki', value: 2 });
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case 'ターン終了時スコア+4':
      case 'アクティブスキルカード使用時、パラメータ+4':
          var effect = new Effect({ type: 'score', value: 4 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      case 'アクティブスキルカード使用時、パラメータ+5':
          var effect = new Effect({ type: 'score', value: 5 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case '最終ターン終了時、スコア+15(集中効果2.5倍適用)':
          var effect = new Effect({ type: 'score', value: 4, options: [{ type: 'status_coef_bonus', target: '集中', value: 2.5 }] });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case 'アクティブスキルカード使用時集中+1':
          var effect = new Effect({ type: '集中', value: 1 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      case 'ターン終了時、集中が3以上の場合、集中+2':
          var effect = new Effect({ type: '集中', value: 2 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case 'ターン終了時、好印象+1':
      case 'メンタルスキルカード使用時好印象+1':
      case '元気効果のスキルカード使用後、好印象+1':
          var effect = new Effect({ type: '好印象', value: 1 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player, true);
      case 'ターン終了時、好印象が3以上の場合、好印象+3':
          var effect = new Effect({ type: '好印象', value: 3 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player, true);
      
      case 'メンタルスキルカード使用時やる気+1':
          var effect = new Effect({ type: 'やる気', value: 1 });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);

      case 'スキルカード使用時、好印象の30%分パラメータ':
      case '好印象効果のスキルカード使用後、好印象の30%分のパラメータ':
          var effect = new Effect({
            type: 'score',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: '好印象', value: 30 }],
          });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      case 'スキルカード使用時、好印象の50%分パラメータ':
      case '好印象効果のスキルカード使用後、好印象の50%分のパラメータ':
          var effect = new Effect({
            type: 'score',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: '好印象', value: 50 }],
          });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      case '残り3ターン以内のターン終了時、好印象の140%分のパラメータ上昇':
          var effect = new Effect({
            type: 'score',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: '好印象', value: 140 }],
          });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      case '残り3ターン以内のターン終了時、好印象の180%分のパラメータ上昇':
          var effect = new Effect({
            type: 'score',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: '好印象', value: 180 }],
          });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case 'スキルカード使用時、好印象の50%分パラメータ・好印象+1':
          var effect1 = new Effect({
            type: 'score',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: '好印象', value: 50 }],
          });
          effect1.value = EffectCalculator.calcValue(effect1, player);
          var effect2 = new Effect({ type: '好印象', value: 1 });
          effect2.value = EffectCalculator.calcValue(effect2, player);
          return total * (AutoEvaluationData.get_enchant_coefficient_evaluation(effect1, player) + total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect2, player, true));

      case '最終ターン終了時、元气130%得分增加':
          var effect = new Effect({ type: 'score', value: 0, options: [{ type: 'increase_by_percentage', target: 'genki', value: 130 }] });
          effect.value = EffectCalculator.calcValue(effect, player);
          return total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect, player);
      
      case '以降、ターン開始時、体力50%以下の場合、元气30%得分增加、最大体力值5%体力恢复':
          var effect1 = new Effect({ type: 'score', value: 0, options: [{ type: 'increase_by_percentage', target: 'genki', value: 30 }] });
          effect1.value = EffectCalculator.calcValue(effect1, player);
          var effect2 = new Effect({
            type: 'heal',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: 'maxHp', value: 5 }],
          });
          effect2.value = EffectCalculator.calcValue(effect2, player);
          return total * (AutoEvaluationData.get_enchant_coefficient_evaluation(effect1, player) + total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect2, player));
      case '以降、ターン開始時、体力50%以下の場合、元气40%得分增加、最大体力值10%体力恢复':
          var effect1 = new Effect({ type: 'score', value: 0, options: [{ type: 'increase_by_percentage', target: 'genki', value: 40 }] });
          effect1.value = EffectCalculator.calcValue(effect1, player);
          var effect2 = new Effect({
            type: 'heal',
            value: 0,
            options: [{ type: 'increase_by_percentage', target: 'maxHp', value: 10 }],
          });
          effect2.value = EffectCalculator.calcValue(effect2, player);
          return total * (AutoEvaluationData.get_enchant_coefficient_evaluation(effect1, player) + total * AutoEvaluationData.get_enchant_coefficient_evaluation(effect2, player));

      case '以降、ターン開始時、いずれかの指針の場合、すべてのスキルカードのパラメータ値増加+4':
          return 0;

      case '次に使用するスキルカードの効果を発動':
      case '次に使用するアクティブスキルカードの効果を発動':
      case '以降、ターン開始時、好調2ターン':
      case '好印象効果':
      case '予約効果':
          return 0;

      default:
          console.log(`${status.name}がないよ`);
          return 0;
    }
  }

  static calcStatusEvaluation(statusMgr, player) {
    let total = 0;
    for (const [_, status] of statusMgr.passiveStatusEffectMap) {
      total += Math.ceil(AutoEvaluationData.get_status_evaluation(status, player));
      if (isNaN(total)) {
        throw new Error(
          `${status.name}でエラー: ${total}, ${player.turnManager.turnTypeList.join(',')}, ${
            player.turnManager.currentTurn
          }, ${player.parameter.vocal}, ${player.parameter.dance}, ${player.parameter.visual}, ${
            status.value
          }`
        );
      }
    }
    for (const activeStatusEffects of statusMgr.activeStatusEffectMap.values()) {
      for (let i = activeStatusEffects.length - 1; 0 <= i; i--) {
        total += Math.ceil(this.calcActiveEvaluation(activeStatusEffects[i], player));
        if (isNaN(total)) {
          throw new Error(`${activeStatusEffects[i].name}でエラー: ${total}`);
        }
      }
    }
    return total;
  }

  /**
   *
   * @param {Player} player
   * @returns
   */
  static calcEvaluation(player) {
    let total_evaluation = 0;
    total_evaluation += AutoEvaluationData.get_basic_evaluation(player);
    total_evaluation += this.calcStatusEvaluation(player.status, player);
    return Math.ceil(total_evaluation);
  }
}
