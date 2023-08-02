from django.contrib import admin
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, Wealth, Knowledge, \
    History, Note, Statistics, Race  # N'oubliez pas d'importer Race


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
    extra = 0


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


class RaceAdmin(admin.ModelAdmin):  # Nouvelle classe RaceAdmin
    list_display = ['name', 'strength_bonus', 'strength_malus', 'dexterity_bonus', 'dexterity_malus',
                    'constitution_bonus', 'constitution_malus', 'perception_bonus', 'perception_malus',
                    'charisma_bonus', 'charisma_malus', 'intelligence_bonus', 'intelligence_malus']
    # Vous pouvez personnaliser cette classe comme vous le souhaitez


admin.site.register(Character, CharacterAdmin)
admin.site.register(Race, RaceAdmin)  # Enregistrement du modèle Race
