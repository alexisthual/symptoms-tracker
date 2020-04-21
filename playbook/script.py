import pandas as pd
from datetime import datetime

pop_reg = {"POPULATION":{'Auvergne-Rhône-Alpes': 8037059,
  'Bourgogne-Franche-Comté': 2813289,
  'Bretagne': 3336643,
  'Centre-Val de Loire': 2582522,
  'Corse': 337796,
  'Grand Est': 5548090,
  'Guadeloupe': 390704,
  'Guyane': 281612,
  'Hauts-de-France': 6023336,
  'La Réunion': 865826,
  'Martinique': 371246,
  'Mayotte': 259154,
  'Normandie': 3342467,
  'Nouvelle-Aquitaine': 5994336,
  'Occitanie': 5903190,
  'Pays de la Loire': 3787411,
  "Provence-Alpes-Côte d'Azur": 5065723,
  'Île-de-France': 12246234},
           "INSEE":{'Auvergne-Rhône-Alpes': 84,
  'Bourgogne-Franche-Comté': 27,
  'Bretagne': 53,
  'Centre-Val de Loire': 24,
  'Corse': 94,
  'Grand Est': 44,
  'Guadeloupe': 1,
  'Guyane': 3,
  'Hauts-de-France': 32,
  'La Réunion': 4,
  'Martinique': 2,
  'Mayotte': 6,
  'Normandie': 28,
  'Nouvelle-Aquitaine': 75,
  'Occitanie': 76,
  'Pays de la Loire': 52,
  "Provence-Alpes-Côte d'Azur": 93,
  'Île-de-France': 11}}
pop_reg_df = pd.DataFrame.from_dict(pop_reg,orient="columns")

dept_reg = {'01': 'Auvergne-Rhône-Alpes',
 '02': 'Hauts-de-France',
 '03': 'Auvergne-Rhône-Alpes',
 '04': "Provence-Alpes-Côte d'Azur",
 '05': "Provence-Alpes-Côte d'Azur",
 '06': "Provence-Alpes-Côte d'Azur",
 '07': 'Auvergne-Rhône-Alpes',
 '08': 'Grand Est',
 '09': 'Occitanie',
 '10': 'Grand Est',
 '11': 'Occitanie',
 '12': 'Occitanie',
 '13': "Provence-Alpes-Côte d'Azur",
 '14': 'Normandie',
 '15': 'Auvergne-Rhône-Alpes',
 '16': 'Nouvelle-Aquitaine',
 '17': 'Nouvelle-Aquitaine',
 '18': 'Centre-Val de Loire',
 '19': 'Nouvelle-Aquitaine',
 '21': 'Bourgogne-Franche-Comté',
 '22': 'Bretagne',
 '23': 'Nouvelle-Aquitaine',
 '24': 'Nouvelle-Aquitaine',
 '25': 'Bourgogne-Franche-Comté',
 '26': 'Auvergne-Rhône-Alpes',
 '27': 'Normandie',
 '28': 'Centre-Val de Loire',
 '29': 'Bretagne',
 '20': 'Corse',
 '2A': 'Corse',
 '2B': 'Corse',
 '30': 'Occitanie',
 '31': 'Occitanie',
 '32': 'Occitanie',
 '33': 'Nouvelle-Aquitaine',
 '34': 'Occitanie',
 '35': 'Bretagne',
 '36': 'Centre-Val de Loire',
 '37': 'Centre-Val de Loire',
 '38': 'Auvergne-Rhône-Alpes',
 '39': 'Bourgogne-Franche-Comté',
 '40': 'Nouvelle-Aquitaine',
 '41': 'Centre-Val de Loire',
 '42': 'Auvergne-Rhône-Alpes',
 '43': 'Auvergne-Rhône-Alpes',
 '44': 'Pays de la Loire',
 '45': 'Centre-Val de Loire',
 '46': 'Occitanie',
 '47': 'Nouvelle-Aquitaine',
 '48': 'Occitanie',
 '49': 'Pays de la Loire',
 '50': 'Normandie',
 '51': 'Grand Est',
 '52': 'Grand Est',
 '53': 'Pays de la Loire',
 '54': 'Grand Est',
 '55': 'Grand Est',
 '56': 'Bretagne',
 '57': 'Grand Est',
 '58': 'Bourgogne-Franche-Comté',
 '59': 'Hauts-de-France',
 '60': 'Hauts-de-France',
 '61': 'Normandie',
 '62': 'Hauts-de-France',
 '63': 'Auvergne-Rhône-Alpes',
 '64': 'Nouvelle-Aquitaine',
 '65': 'Occitanie',
 '66': 'Occitanie',
 '67': 'Grand Est',
 '68': 'Grand Est',
 '69': 'Auvergne-Rhône-Alpes',
 '70': 'Bourgogne-Franche-Comté',
 '71': 'Bourgogne-Franche-Comté',
 '72': 'Pays de la Loire',
 '73': 'Auvergne-Rhône-Alpes',
 '74': 'Auvergne-Rhône-Alpes',
 '75': 'Île-de-France',
 '76': 'Normandie',
 '77': 'Île-de-France',
 '78': 'Île-de-France',
 '79': 'Nouvelle-Aquitaine',
 '80': 'Hauts-de-France',
 '81': 'Occitanie',
 '82': 'Occitanie',
 '83': "Provence-Alpes-Côte d'Azur",
 '84': "Provence-Alpes-Côte d'Azur",
 '85': 'Pays de la Loire',
 '86': 'Nouvelle-Aquitaine',
 '87': 'Nouvelle-Aquitaine',
 '88': 'Grand Est',
 '89': 'Bourgogne-Franche-Comté',
 '90': 'Bourgogne-Franche-Comté',
 '91': 'Île-de-France',
 '92': 'Île-de-France',
 '93': 'Île-de-France',
 '94': 'Île-de-France',
 '95': 'Île-de-France',
 '971': 'Guadeloupe',
 '972': 'Martinique',
 '973': 'Guyane',
 '974': 'La Réunion',
 '976': 'Mayotte'}
dept_reg_df = pd.DataFrame.from_dict(dept_reg,orient="index",columns=["REGION"])

df = pd.read_csv("/srv/data/data.csv",sep="|")
df = df.loc[~df.zipcode.isnull()]
# SELECT ALL ANSWERS FROM LAST 7 DAYS
df = df.loc[(pd.to_datetime(df.submittedAt) - datetime.today()).dt.days > -7]
df["dep"] = df.zipcode.astype(str).str[:2]
rep_by_dept = df.pivot_table(index="dep",values="id",aggfunc="count",columns="health")
rep_by_dept["TOTAL"] = rep_by_dept.sum(axis=1)
rep_by_reg = rep_by_dept.merge(dept_reg_df,left_index=True,right_index=True,how="right").groupby("REGION").sum().fillna(0)

df = rep_by_reg.merge(pop_reg_df,left_index=True,right_index=True,how="right").fillna(0)
# TARGET : 1 answer / week / 6,000 people
df["TARGET"] = df["POPULATION"] / 6000
df["TARGET_PERCENT"] = 100*df["TOTAL"] / df["TARGET"]
df.index.name = "REGION"
df.sort_values("TOTAL",ascending=False,inplace=True)
df.to_csv("/srv/data/export_region.csv",index=True)

print("Successfully saved /srv/data/export_region.csv")
print(df)

json_string = '{\n"total": %d\n}' % (100*df.TOTAL.sum() / df.TARGET.sum())
f = open("/srv/data/progress.json","w")
f.write(json_string)
f.close()

print("Succesfully saved /srv/data/progress.json")
print(json_string)
