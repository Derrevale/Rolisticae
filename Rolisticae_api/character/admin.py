from django.contrib import admin
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, Wealth, Knowledge, \
    History, Note, Statistics


class EquipmentInline(admin.StackedInline):
    model = Equipment
    extra = 1  # Number of extra forms to display


class MagicItemInline(admin.StackedInline):
    model = MagicItem
    extra = 1


class MiscellaneousItemInline(admin.StackedInline):
    model = MiscellaneousItem
    extra = 1


class FoodDrinkInline(admin.StackedInline):
    model = FoodDrink
    extra = 1


class HealingPotionInline(admin.StackedInline):
    model = HealingPotion
    extra = 1


class WealthInline(admin.StackedInline):
    model = Wealth
    extra = 1
    max_num = 1
    can_delete = False


class KnowledgeInline(admin.StackedInline):
    model = Knowledge
    extra = 1


class HistoryInline(admin.StackedInline):
    model = History
    extra = 1
    max_num = 1
    can_delete = False


class NoteInline(admin.StackedInline):
    model = Note
    extra = 1


class StatisticsInline(admin.StackedInline):
    model = Statistics
    extra = 1
    max_num = 1
    can_delete = False


class CharacterAdmin(admin.ModelAdmin):
    inlines = [StatisticsInline, EquipmentInline, MagicItemInline, MiscellaneousItemInline, FoodDrinkInline,
               HealingPotionInline, WealthInline, KnowledgeInline, HistoryInline, NoteInline]


admin.site.register(Character, CharacterAdmin)
